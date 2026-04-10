import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  onCancel,
  disabled = false
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptLoaded) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=${currency}`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      script.onerror = (e) => {
        console.error('Failed to load PayPal script:', e);
        setError('加载 PayPal 脚本失败，请检查网络连接');
        setLoading(false);
      };
      document.body.appendChild(script);

      return () => {
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, [scriptLoaded, currency]);

  useEffect(() => {
    if (scriptLoaded && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: currency
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            onSuccess(data.orderID);
          });
        },
        onCancel: () => {
          onCancel();
        },
        onError: (err: any) => {
          onError('支付过程中出现错误');
        }
      }).render(paypalRef.current);
    }
  }, [scriptLoaded, amount, currency, onSuccess, onError, onCancel]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <i className="text-blue-500">🔒</i>
          安全支付由 PayPal 提供
        </span>
      </div>
      <div ref={paypalRef} className="w-full"></div>
      {loading && (
        <div className="mt-4 text-center text-gray-600">
          正在加载 PayPal 支付...
        </div>
      )}
    </div>
  );
};

export default PayPalButton;