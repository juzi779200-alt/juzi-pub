import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { BANK_INFO } from '../constants';
import { useLanguage } from './LanguageContext';

const BankInfoCard: React.FC = () => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const { t } = useLanguage();

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const FieldRow = ({ label, value, copyValue }: { label: string, value: string, copyValue?: string }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1 sm:mb-0">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-800 text-right break-all">{value}</span>
        <button 
          onClick={() => handleCopy(copyValue || value, label)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-brand-accent"
          title={t.bank.copy}
        >
          {copiedField === label ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden mt-8">
      
      <div className="p-6">
        <FieldRow label={t.bank.beneficiary} value={BANK_INFO.beneficiary} />
        <FieldRow label={t.bank.bankName} value={BANK_INFO.bankName} />
        <FieldRow label={t.bank.accountNo} value={BANK_INFO.accountNumber} />
        <FieldRow label={t.bank.swift} value={BANK_INFO.swiftCode} />
        <FieldRow label={t.bank.country} value={BANK_INFO.country} />
        <FieldRow label={t.bank.province} value={BANK_INFO.province} />
        <FieldRow label={t.bank.city} value={BANK_INFO.city} />
        
        <div className="py-3 mt-2 bg-gray-50 rounded-lg px-4 border border-gray-100">
           <span className="text-gray-500 text-xs font-medium uppercase tracking-wider block mb-1">{t.bank.fullAddress}</span>
           <div className="flex items-start justify-between gap-2">
             <span className="text-sm text-gray-700 leading-relaxed">{BANK_INFO.address}</span>
             <button 
              onClick={() => handleCopy(BANK_INFO.address, 'Address')}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors text-gray-400 hover:text-brand-accent flex-shrink-0"
            >
              {copiedField === 'Address' ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
           </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-100">
        {t.bank.footer}
      </div>
    </div>
  );
};

export default BankInfoCard;
