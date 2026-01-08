import React, { useEffect, useRef, useState } from 'react';

interface PayPalButtonProps {
  amount: number;
  description: string;
  productId: string;
  currency?: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, description, productId, currency = 'USD' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [captureId, setCaptureId] = useState<string | null>(null);
  const [payerName, setPayerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const clientId = (import.meta as any).env?.VITE_PAYPAL_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId || !containerRef.current) return;
    const renderButtons = () => {
      const paypal = (window as any).paypal;
      if (!paypal) return;
      setLoading(false);
      paypal.Buttons({
        style: { layout: 'vertical', shape: 'rect', color: 'gold' },
        createOrder: (_: any, actions: any) => {
          const create = actions.order.create({
            purchase_units: [
              {
                amount: { value: amount.toFixed(2) },
                description,
                reference_id: productId
              }
            ]
          });
          return create;
        },
        onApprove: async (_: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            setOrderId(details?.id ?? null);
            const cap = details?.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? null;
            setCaptureId(cap);
            const name = details?.payer?.name?.given_name ?? null;
            setPayerName(name);
            setPaid(true);
          } catch (e: any) {
            setError('支付失败，请稍后重试');
          }
        },
        onError: () => {
          setError('支付初始化失败');
          setLoading(false);
        }
      }).render(containerRef.current);
    };
    if ((window as any).paypal) {
      renderButtons();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = renderButtons;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [amount, description, clientId, currency, productId]);

  if (!clientId) {
    return <div className="text-sm text-red-500">缺少 PayPal Client ID，请设置环境变量 VITE_PAYPAL_CLIENT_ID</div>;
  }

  return (
    <div>
      {error && <div className="p-3 mb-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">{error}</div>}
      {paid ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
          <div className="font-bold mb-1">支付已完成</div>
          {payerName && <div className="text-sm">付款人：{payerName}</div>}
          {orderId && <div className="text-sm">订单号：{orderId}</div>}
          {captureId && <div className="text-sm">交易号：{captureId}</div>}
        </div>
      ) : (
        <>
          {loading && <div className="text-sm text-gray-500 mb-2">正在加载支付组件…</div>}
          <div ref={containerRef} />
        </>
      )}
    </div>
  );
};

export default PayPalButton;
