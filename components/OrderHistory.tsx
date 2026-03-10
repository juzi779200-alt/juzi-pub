import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

interface Order {
  id: string;
  date: string;
  items: Array<{
    product: {
      id: string;
      title: {
        en: string;
        zh: string;
        es: string;
      };
      price: number;
      images: string[];
    };
    quantity: number;
  }>;
  totalPrice: number;
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: 'bank' | 'paypal';
  status: 'processing' | 'shipped' | 'delivered';
}

interface OrderHistoryProps {
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    // 从localStorage获取订单
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (err) {
        console.error('Failed to parse orders:', err);
      }
    }
  }, []);

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order);
    // 模拟跟踪号
    setTrackingNumber('TRK' + Math.floor(Math.random() * 1000000));
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              ×
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Please sign in to view your order history</p>
            <button 
              onClick={onClose} 
              className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
            <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-900">
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-medium">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${selectedOrder.status === 'processing' ? 'text-yellow-500' : selectedOrder.status === 'shipped' ? 'text-blue-500' : 'text-green-500'}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Number:</span>
                  <span className="font-medium">{trackingNumber}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
              <p className="text-gray-700">
                {selectedOrder.shippingInfo.name}<br />
                {selectedOrder.shippingInfo.address}<br />
                {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.country} {selectedOrder.shippingInfo.zipCode}<br />
                {selectedOrder.shippingInfo.phone}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Order Items</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <span>{item.product.title[language]} × {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedOrder(null)} 
              className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            ×
          </button>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You have no orders yet</p>
            <button 
              onClick={onClose} 
              className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
                    <p className={`text-sm ${order.status === 'processing' ? 'text-yellow-500' : order.status === 'shipped' ? 'text-blue-500' : 'text-green-500'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {order.items.length} items
                  </div>
                  <button 
                    onClick={() => handleTrackOrder(order)}
                    className="bg-brand-dark text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-accent transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;