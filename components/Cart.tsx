import React from 'react';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';

const Cart: React.FC<{ onClose: () => void; onCheckout: () => void }> = ({ onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { language } = useLanguage();

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              ×
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button 
              onClick={onClose} 
              className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart ({totalItems} items)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            ×
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.title[language]} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{item.product.title[language]}</h3>
                <p className="text-gray-500 text-sm mb-2">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-gray-600">Subtotal</span>
            <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Shipping and taxes will be calculated at checkout</p>
        </div>
        
        <button 
          onClick={onCheckout} 
          className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;