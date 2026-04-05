import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: any[];
}

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip_code: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchUserOrders(token);
  }, [navigate]);

  const fetchUserOrders = async (token: string) => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark">
            {language === 'en' ? 'Dashboard' : language === 'zh' ? '仪表板' : 'Panel de Control'}
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            {language === 'en' ? 'Logout' : language === 'zh' ? '退出登录' : 'Cerrar Sesión'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-brand-dark">
              {language === 'en' ? 'Profile' : language === 'zh' ? '个人信息' : 'Perfil'}
            </h2>
            {user && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Name' : language === 'zh' ? '姓名' : 'Nombre'}</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Email' : language === 'zh' ? '邮箱' : 'Correo'}</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Phone' : language === 'zh' ? '电话' : 'Teléfono'}</p>
                  <p className="font-medium">{user.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Address' : language === 'zh' ? '地址' : 'Dirección'}</p>
                  <p className="font-medium">{user.address || '-'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'City' : language === 'zh' ? '城市' : 'Ciudad'}</p>
                    <p className="font-medium">{user.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Country' : language === 'zh' ? '国家' : 'País'}</p>
                    <p className="font-medium">{user.country || '-'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-brand-dark">
              {language === 'en' ? 'Order Statistics' : language === 'zh' ? '订单统计' : 'Estadísticas de Pedidos'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-brand-light rounded-xl">
                <p className="text-3xl font-bold text-brand-dark">{orders.length}</p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Total Orders' : language === 'zh' ? '总订单数' : 'Pedidos Totales'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-3xl font-bold text-green-700">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Delivered' : language === 'zh' ? '已送达' : 'Entregados'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-brand-dark">
              {language === 'en' ? 'Quick Actions' : language === 'zh' ? '快捷操作' : 'Acciones Rápidas'}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/orders')}
                className="w-full text-left px-4 py-3 bg-brand-light text-brand-dark rounded-xl hover:bg-brand-accent transition-colors"
              >
                {language === 'en' ? 'View All Orders' : language === 'zh' ? '查看所有订单' : 'Ver Todos los Pedidos'}
              </button>
              <button
                onClick={() => navigate('/track')}
                className="w-full text-left px-4 py-3 bg-brand-light text-brand-dark rounded-xl hover:bg-brand-accent transition-colors"
              >
                {language === 'en' ? 'Track Package' : language === 'zh' ? '跟踪包裹' : 'Rastrear Paquete'}
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full text-left px-4 py-3 bg-brand-light text-brand-dark rounded-xl hover:bg-brand-accent transition-colors"
              >
                {language === 'en' ? 'Shop Now' : language === 'zh' ? '立即购物' : 'Comprar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-brand-dark">
            {language === 'en' ? 'Recent Orders' : language === 'zh' ? '最近订单' : 'Pedidos Recientes'}
          </h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {language === 'en' ? 'No orders yet' : language === 'zh' ? '暂无订单' : 'Aún no hay pedidos'}
            </p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
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
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="px-4 py-2 bg-brand-dark text-white rounded-xl hover:bg-brand-accent transition-colors"
                    >
                      {language === 'en' ? 'View Details' : language === 'zh' ? '查看详情' : 'Ver Detalles'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
