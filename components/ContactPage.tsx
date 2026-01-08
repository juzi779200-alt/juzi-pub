import React, { useState } from 'react';
import StaticPage from './StaticPage';
import { Mail, MapPin, Phone, MessageCircle, Copy, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from './LanguageContext';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copyWhatsApp = () => {
    navigator.clipboard.writeText(CONTACT_INFO.whatsapp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  

  return (
    <StaticPage title={t.contact.title} subtitle={t.contact.subtitle} onBack={onBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t.contact.getInTouch}</h3>
          
          <div className="space-y-8">
            {/* Highlighted WhatsApp Section */}
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                   <MessageCircle size={100} className="text-green-600" />
               </div>
               <div className="relative z-10">
                   <h4 className="font-bold text-green-800 text-lg mb-2 flex items-center gap-2">
                       <MessageCircle size={24} /> {t.contact.whatsappSupport}
                   </h4>
                   <div className="flex items-center gap-3">
                       <p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                           {CONTACT_INFO.whatsapp}
                       </p>
                       <button 
                         onClick={copyWhatsApp}
                         className="p-2 bg-white rounded-full shadow-sm hover:text-green-600 transition-colors"
                         title="Copy Number"
                       >
                           {copied ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20} />}
                       </button>
                   </div>
                   <p className="text-sm text-green-700 mt-2 font-medium">
                       {t.contact.whatsappDesc}
                   </p>
               </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-pink/30 p-3 rounded-full text-brand-accent">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.emailSupport}</h4>
                <div className="flex flex-col gap-1">
                    <a href={`mailto:${CONTACT_INFO.email1}`} className="text-gray-600 hover:text-brand-accent transition-colors font-medium">
                        {CONTACT_INFO.email1}
                    </a>
                    {CONTACT_INFO.email2 !== CONTACT_INFO.email1 && (
                      <a href={`mailto:${CONTACT_INFO.email2}`} className="text-gray-600 hover:text-brand-accent transition-colors font-medium">
                          {CONTACT_INFO.email2}
                      </a>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Response time: Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-pink/30 p-3 rounded-full text-brand-accent">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.location}</h4>
                <p className="text-gray-600">Guang'an City, Sichuan Province, China</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-pink/30 p-3 rounded-full text-brand-accent">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{t.contact.hours}</h4>
                <p className="text-gray-600">Monday - Friday</p>
                <p className="text-sm text-gray-500">9:00 AM - 6:00 PM (GMT+8)</p>
              </div>
            </div>
          </div>
        </div>

        <form name="contact" method="POST" data-netlify="true" className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <input type="hidden" name="form-name" value="contact" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.contact.form.name}</label>
              <input name="name" type="text" required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.contact.form.email}</label>
              <input name="email" type="email" required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.contact.form.orderNo}</label>
              <input name="order" type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t.contact.form.message}</label>
              <textarea name="message" required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-brand-accent transition-colors shadow-lg">
              {t.contact.form.send}
            </button>
          </div>
        </form>
      </div>
    </StaticPage>
  );
};

export default ContactPage;
