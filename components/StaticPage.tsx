import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StaticPageProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, subtitle, onBack, children }) => {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-brand-accent transition-colors font-medium mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t.product.back}
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-gray-500 mb-8">{subtitle}</p>}
          
          <div className="prose prose-pink max-w-none text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
