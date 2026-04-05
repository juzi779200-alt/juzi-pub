import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import PayPalButton from './PayPalButton';

interface CheckoutProps {
  onClose: () => void;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose, onSuccess }) => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'paypal'>('bank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZipCode = (zipCode: string, country: string): boolean => {
    const usZipRegex = /^\d{5}(-\d{4})?$/;
    const ukZipRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    
    if (country.toLowerCase().includes('us') || country.toLowerCase().includes('usa') || country.toLowerCase().includes('united states')) {
      return usZipRegex.test(zipCode);
    } else if (country.toLowerCase().includes('uk') || country.toLowerCase().includes('united kingdom')) {
      return ukZipRegex.test(zipCode);
    }
    return zipCode.length >= 3;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    if (!shippingInfo.name.trim()) {
      errors.name = 'Full name is required';
    }
    
    if (!shippingInfo.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(shippingInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!shippingInfo.address.trim()) {
      errors.address = 'Address is required';
    } else if (shippingInfo.address.trim().length < 10) {
      errors.address = 'Please enter a complete address (at least 10 characters)';
    }
    
    if (!shippingInfo.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!shippingInfo.country.trim()) {
      errors.country = 'Country is required';
    }
    
    if (!shippingInfo.zipCode.trim()) {
      errors.zipCode = 'Zip/Postal code is required';
    } else if (!validateZipCode(shippingInfo.zipCode, shippingInfo.country)) {
      errors.zipCode = 'Please enter a valid zip/postal code for your country';
    }
    
    if (!shippingInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(shippingInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError('Please correct the highlighted fields');
      return;
    }
    
    setValidationErrors({});
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 生成订单号
      const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
      
      // 保存订单信息到localStorage
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        totalPrice,
        shippingInfo,
        paymentMethod,
        status: 'processing'
      };
      
      // 获取现有订单
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      // 添加新订单
      existingOrders.push(order);
      // 保存回localStorage
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // 清空购物车
      clearCart();
      
      // 显示成功消息
      onSuccess();
    } catch (err) {
      setError('Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            ×
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary and Payment */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.product.title[language]}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-4 h-4 text-brand-accent"
                />
                <label htmlFor="bank" className="font-medium">Bank Transfer</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="w-4 h-4 text-brand-accent"
                />
                <label htmlFor="paypal" className="font-medium">PayPal</label>
              </div>
            </div>
            
            
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
            
            {paymentMethod === 'paypal' && (
              <div className="mt-4">
                <PayPalButton 
                  amount={totalPrice} 
                  description={`Order from luckboxdiy - ${cart.length} items`}
                  productId={cart.map(item => item.product.id).join(',')}
                  onSuccess={() => {
                    clearCart();
                    onSuccess();
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;