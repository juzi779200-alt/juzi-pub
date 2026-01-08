import React, { useState } from 'react';
import { ArrowLeft, Star, ShieldCheck, Truck, CreditCard, MessageCircle, Apple } from 'lucide-react';
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';
import PayPalButton from './PayPalButton';
import { useLanguage } from './LanguageContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [showApplePayModal, setShowApplePayModal] = useState(false);
  const { language, t } = useLanguage();

  const handleApplePayClick = () => {
    setShowApplePayModal(true);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-brand-accent transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t.product.back}
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
              <img 
                src={activeImage} 
                alt={product.title[language]} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-brand-accent opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
                {product.tags.map(tag => (
                    <span key={tag[language]} className="bg-brand-pink/30 text-brand-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {tag[language]}
                    </span>
                ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title[language]}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} {t.product.reviews})</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-brand-accent">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through decoration-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="prose prose-pink text-gray-600 mb-8 leading-relaxed">
              <p>{product.description[language]}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <ShieldCheck className="text-brand-accent mb-2" />
                    <span className="text-xs font-semibold text-gray-700">{t.product.buyerProtection}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <Truck className="text-brand-accent mb-2" />
                    <span className="text-xs font-semibold text-gray-700">{t.product.fastShipping}</span>
                </div>
                 <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                    <CreditCard className="text-brand-accent mb-2" />
                    <span className="text-xs font-semibold text-gray-700">{t.product.securePayment}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                   <span className="w-1 h-6 bg-brand-accent rounded-full"></span>
                   {t.product.howToPurchase}
               </h2>
               
               {/* Contact & Apple Pay Options */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <button 
                    onClick={handleApplePayClick}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Apple size={24} />
                    <span>{t.product.payApple}</span>
                  </button>
                  
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <MessageCircle size={24} />
                    <span>{t.product.whatsappOrder}</span>
                  </a>
               </div>

              <div className="mb-8">
                <PayPalButton amount={product.price} description={product.title[language]} productId={product.id} currency="USD" />
              </div>
              
              {/* Bank transfer removed as requested */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Apple Pay Modal Simulation */}
      {showApplePayModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowApplePayModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Apple size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.product.applePayModal.title}</h3>
              <p className="text-gray-600 mb-6">
                {t.product.applePayModal.desc}
              </p>
              
              <div className="bg-gray-100 p-4 rounded-xl mb-6 flex flex-col items-center">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-1">WhatsApp Number</span>
                <span className="text-xl font-bold text-gray-900 select-all">{CONTACT_INFO.whatsapp}</span>
              </div>

              <div className="flex gap-3">
                 <button 
                   onClick={() => setShowApplePayModal(false)}
                   className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                 >
                   {t.product.applePayModal.cancel}
                 </button>
                 <a 
                   href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                 >
                   <MessageCircle size={18} /> {t.product.applePayModal.chat}
                 </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
