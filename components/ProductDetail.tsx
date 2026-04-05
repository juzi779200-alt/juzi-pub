import React, { useState } from 'react';
import { ArrowLeft, Star, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import PayPalButton from './PayPalButton';
import { useLanguage } from './LanguageContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const { language, t } = useLanguage();

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentTitle = selectedVariant 
    ? `${product.title[language]} - ${selectedVariant.name[language]}`
    : product.title[language];

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
              <span className="text-4xl font-bold text-brand-accent">${currentPrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through decoration-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Choose Option</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {variant.name[language]}
                    </button>
                  ))}
                </div>
                {selectedVariant && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {selectedVariant.name[language]} - ${selectedVariant.price.toFixed(2)}
                  </p>
                )}
              </div>
            )}

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
               
              <div className="mb-8">
                <PayPalButton amount={currentPrice} description={currentTitle} productId={product.id} currency="USD" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
