import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-brand-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-brand-dark">
          {language === 'en' ? 'Create Account' : language === 'zh' ? '创建账户' : 'Crear Cuenta'}
        </h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Email' : language === 'zh' ? '邮箱' : 'Correo'}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? 'your@email.com' : language === 'zh' ? '您的邮箱' : 'su@email.com'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Password' : language === 'zh' ? '密码' : 'Contraseña'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? '••••••••' : '••••••••'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Confirm Password' : language === 'zh' ? '确认密码' : 'Confirmar Contraseña'}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? '••••••••' : '••••••••'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Name' : language === 'zh' ? '姓名' : 'Nombre'}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? 'Your Name' : language === 'zh' ? '您的姓名' : 'Su Nombre'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Phone' : language === 'zh' ? '电话' : 'Teléfono'}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? '+86 138 0000 0000' : '+86 138 0000 0000'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Address' : language === 'zh' ? '地址' : 'Dirección'}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? 'Your Address' : language === 'zh' ? '您的地址' : 'Su Dirección'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'en' ? 'City' : language === 'zh' ? '城市' : 'Ciudad'}
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
                placeholder={language === 'en' ? 'Your City' : language === 'zh' ? '您的城市' : 'Su Ciudad'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'en' ? 'Country' : language === 'zh' ? '国家' : 'País'}
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
                placeholder={language === 'en' ? 'Your Country' : language === 'zh' ? '您的国家' : 'Su País'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'ZIP Code' : language === 'zh' ? '邮编' : 'Código Postal'}
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-accent"
              placeholder={language === 'en' ? '12345' : '12345'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 0 018 8 0 018-8z"></path>
                </svg>
                {language === 'en' ? 'Creating Account...' : language === 'zh' ? '创建账户中...' : 'Creando Cuenta...'}
              </span>
            ) : (
              language === 'en' ? 'Create Account' : language === 'zh' ? '创建账户' : 'Crear Cuenta'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {language === 'en' ? 'Already have an account?' : language === 'zh' ? '已有账户？' : '¿Ya tienes cuenta?'}{' '}
          <a href="/login" className="text-brand-accent hover:underline font-medium">
            {language === 'en' ? 'Login' : language === 'zh' ? '登录' : 'Iniciar Sesión'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
