import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

interface Shipping {
  id: string;
  tracking_number: string;
  carrier: string;
  status: string;
  estimated_delivery: string;
  actual_delivery: string;
  notes: string;
  history: any[];
  order_number: string;
}

const TrackOrder: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://138.197.66.29:3001/api/shipping/track/${trackingNumber}`);
      const data = await response.json();

      if (response.ok) {
        setShipping(data.shipping);
      } else {
        setError(data.message || 'Tracking number not found');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-brand-dark py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-brand-accent hover:underline font-medium"
          >
            ← {language === 'en' ? 'Back to Dashboard' : language === 'zh' ? '返回仪表板' : 'Volver al Panel'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-brand-dark">
            {language === 'en' ? 'Track Your Order' : language === 'zh' ? '订单跟踪' : 'Rastrear tu Pedido'}
          </h1>

          <form onSubmit={handleTrack} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={language === 'en' ? 'Enter tracking number' : language === 'zh' ? '输入跟踪号' : 'Ingresa el número de rastreo'}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-accent transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 0 018 8 0 018-8z"></path>
                    </svg>
                    {language === 'en' ? 'Tracking...' : language === 'zh' ? '查询中...' : 'Rastreando...'}
                  </span>
                ) : (
                  language === 'en' ? 'Track' : language === 'zh' ? '查询' : 'Rastrear'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {shipping && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Order Number' : language === 'zh' ? '订单号' : 'Número de Pedido'}</p>
                    <p className="font-bold text-lg">{shipping.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Tracking Number' : language === 'zh' ? '跟踪号' : 'Número de Rastreo'}</p>
                    <p className="font-bold text-lg">{shipping.tracking_number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Carrier' : language === 'zh' ? '承运商' : 'Transportista'}</p>
                    <p className="font-medium">{shipping.carrier || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Current Status' : language === 'zh' ? '当前状态' : 'Estado Actual'}</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipping.status)}`}>
                      {shipping.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Estimated Delivery' : language === 'zh' ? '预计送达' : 'Entrega Estimada'}</p>
                    <p className="font-medium">{shipping.estimated_delivery || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Actual Delivery' : language === 'zh' ? '实际送达' : 'Entrega Actual'}</p>
                    <p className="font-medium">{shipping.actual_delivery || '-'}</p>
                  </div>
                </div>

                {shipping.notes && (
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Notes' : language === 'zh' ? '备注' : 'Notas'}</p>
                    <p className="font-medium">{shipping.notes}</p>
                  </div>
                )}
              </div>

              {shipping.history && shipping.history.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-brand-dark">
                    {language === 'en' ? 'Tracking History' : language === 'zh' ? '跟踪历史' : 'Historial de Rastreo'}
                  </h2>
                  <div className="space-y-3">
                    {shipping.history.map((item: any, index: number) => (
                      <div key={index} className="border-l-2 border-brand-light pl-4 py-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-medium">{item.status}</p>
                            <p className="text-sm text-gray-600">{item.location || '-'}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!shipping && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {language === 'en' ? 'Enter your tracking number above to see your order status' : language === 'zh' ? '输入跟踪号查看订单状态' : 'Ingresa tu número de rastreo arriba para ver el estado de tu pedido'}
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center p-4 bg-brand-light rounded-xl">
                  <p className="text-2xl font-bold text-brand-dark">1</p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Enter Tracking Number' : language === 'zh' ? '输入跟踪号' : 'Ingresa Número'}
                  </p>
                </div>
                <div className="text-center p-4 bg-brand-light rounded-xl">
                  <p className="text-2xl font-bold text-brand-dark">2</p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'View Status' : language === 'zh' ? '查看状态' : 'Ver Estado'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
