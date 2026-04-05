import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_zip_code: string;
  created_at: string;
  items: any[];
}

const Orders: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchOrders(token);
  }, [navigate]);

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch('http://138.197.66.29:3001/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://138.197.66.29:3001/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedOrder(data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-brand-accent hover:underline font-medium"
          >
            ← {language === 'en' ? 'Back to Dashboard' : language === 'zh' ? '返回仪表板' : 'Volver al Panel'}
          </button>
        </div>

        {selectedOrder ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">
              {language === 'en' ? 'Order Details' : language === 'zh' ? '订单详情' : 'Detalles del Pedido'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-brand-dark">
                  {language === 'en' ? 'Order Information' : language === 'zh' ? '订单信息' : 'Información del Pedido'}
                </h2>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Order Number' : language === 'zh' ? '订单号' : 'Número de Pedido'}</p>
                  <p className="font-medium">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Total Amount' : language === 'zh' ? '总金额' : 'Monto Total'}</p>
                  <p className="font-medium text-2xl text-brand-dark">${selectedOrder.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Status' : language === 'zh' ? '状态' : 'Estado'}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Payment Method' : language === 'zh' ? '支付方式' : 'Método de Pago'}</p>
                  <p className="font-medium">{selectedOrder.payment_method}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold text-brand-dark">
                  {language === 'en' ? 'Shipping Information' : language === 'zh' ? '收货信息' : 'Información de Envío'}
                </h2>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Name' : language === 'zh' ? '姓名' : 'Nombre'}</p>
                  <p className="font-medium">{selectedOrder.shipping_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Email' : language === 'zh' ? '邮箱' : 'Correo'}</p>
                  <p className="font-medium">{selectedOrder.shipping_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Phone' : language === 'zh' ? '电话' : 'Teléfono'}</p>
                  <p className="font-medium">{selectedOrder.shipping_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Address' : language === 'zh' ? '地址' : 'Dirección'}</p>
                  <p className="font-medium">{selectedOrder.shipping_address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'City' : language === 'zh' ? '城市' : 'Ciudad'}</p>
                    <p className="font-medium">{selectedOrder.shipping_city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Country' : language === 'zh' ? '国家' : 'País'}</p>
                    <p className="font-medium">{selectedOrder.shipping_country}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'ZIP Code' : language === 'zh' ? '邮编' : 'Código Postal'}</p>
                  <p className="font-medium">{selectedOrder.shipping_zip_code}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-bold mb-4 text-brand-dark">
                {language === 'en' ? 'Order Items' : language === 'zh' ? '订单商品' : 'Artículos del Pedido'}
              </h2>
              <div className="space-y-3">
                {selectedOrder.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? 'Quantity' : language === 'zh' ? '数量' : 'Cantidad'}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-lg text-brand-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">
              {language === 'en' ? 'My Orders' : language === 'zh' ? '我的订单' : 'Mis Pedidos'}
            </h1>
            
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {language === 'en' ? 'No orders found' : language === 'zh' ? '暂无订单' : 'No se encontraron pedidos'}
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-lg">{order.order_number}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-brand-dark">
                        ${order.total_amount.toFixed(2)}
                      </p>
                      <button className="px-4 py-2 bg-brand-dark text-white rounded-xl hover:bg-brand-accent transition-colors">
                        {language === 'en' ? 'View Details' : language === 'zh' ? '查看详情' : 'Ver Detalles'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
