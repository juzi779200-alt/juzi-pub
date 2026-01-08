import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from './LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  inventory?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { language, t } = useLanguage();

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer h-full"
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {t.product.sale}
            </span>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white text-brand-dark px-6 py-2 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                <Eye size={18} /> {t.product.viewDetails}
            </button>
        </div>
      </div>
      
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="text-[10px] md:text-xs text-brand-accent font-bold mb-1.5 uppercase tracking-wider">{product.tags[0][language]}</div>
        <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2 leading-snug group-hover:text-brand-accent transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
            {product.title[language]}
        </h3>
        <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-gray-400 mb-0.5">{t.product.price}</span>
                <span className="text-base md:text-lg font-bold text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
