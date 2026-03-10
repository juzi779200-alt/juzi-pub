import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, Search, MessageCircle, Globe, CreditCard, ShoppingCart, User, Package, Check, Truck, Home } from 'lucide-react';
import LogoIcon from './components/LogoIcon';
import { PRODUCTS, CONTACT_INFO, CATEGORIES } from './constants';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import StaticPage from './components/StaticPage';
import ContactPage from './components/ContactPage';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { CartProvider, useCart } from './components/CartContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import { Language } from './types';


// Vite 的 import.meta.glob 在部分 TS 配置下会提示“ImportMeta 上不存在 glob”，
// 这里用类型断言绕过，运行时仍由 Vite 处理
// 引入所有图片以确保它们被打包到 dist/assets 中
const imageModules = (import.meta as any).glob('./images/*.jpg', { eager: true });
const images = Object.values(imageModules).map(module => (module as { default: string }).default);

type ViewState = 'home' | 'all' | 'product' | 'about' | 'contact' | 'shipping' | 'returns' | 'faq' | 'track';

const MainApp = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const publicImageById: Record<string, string> = {
    p1: '/images/01.jpg',
    p2: '/images/02.jpg',
    p3: '/images/03.jpg',
    p4: '/images/04.jpg',
    p5: '/images/05.jpg',
    p6: '/images/06.jpg',
    p7: '/images/10.jpg',
    p8: '/images/11.jpg',
    p9: '/images/12.jpg',
    p10: '/images/13.jpg',
    p11: '/images/09.jpg',
    p12: '/images/07.jpg'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const initialInventory: Record<string, number> = {};
    PRODUCTS.forEach(product => {
      initialInventory[product.id] = product.inventory;
    });
    setInventory(initialInventory);
  }, []);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-decrement inventory when product is clicked (simulating purchase)
    setInventory(prev => {
      const currentInventory = prev[id] || 0;
      if (currentInventory > 0) {
        return {
          ...prev,
          [id]: currentInventory - 1
        };
      }
      return prev;
    });
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId);

  // Helper to render static content pages
  const renderContent = () => {
    switch (currentView) {
      case 'all':
        return (
          <StaticPage title={t.nav.all} onBack={() => navigateTo('home')}>
            <div className="space-y-12">
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{cat.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                    {cat.products.map((p) => (
                      <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 text-sm md:text-base mb-2">{p.name}</h4>
                          <p className="text-xs text-gray-500 mb-3">{p.description}</p>
                          <div className="text-base md:text-lg font-bold text-gray-900 tracking-tight">${p.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">所有单品</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                  {PRODUCTS.filter(p => p.id !== 'p14').map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))}
                </div>
              </div>
            </div>
          </StaticPage>
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => navigateTo('home')} />
        ) : null;
      
      case 'about':
        return (
             <StaticPage title={t.about.title} onBack={() => navigateTo('home')}>
             {t.about.content.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
             ))}
             <img 
               src={new URL('./images/11.jpg', import.meta.url).href}
               alt="Our Workshop" 
               className="w-full rounded-2xl my-8 shadow-sm" 
             />
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.about.promiseTitle}</h3>
             <ul className="list-disc pl-5 space-y-2">
               {t.about.promises.map((promise, index) => (
                 <li key={index}>{promise}</li>
               ))}
             </ul>
          </StaticPage>
        );

      case 'contact':
        return <ContactPage onBack={() => navigateTo('home')} />;

      case 'shipping':
        return (
          <StaticPage title={t.shipping.title} onBack={() => navigateTo('home')}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.shipping.processingTitle}</h3>
            <p className="mb-4">{t.shipping.processingDesc}</p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.shipping.ratesTitle}</h3>
            <p className="mb-4">{t.shipping.ratesDesc}</p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.shipping.deliveryTitle}</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              {t.shipping.deliveryList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.shipping.restrictedTitle}</h3>
            <p className="mb-4">{t.shipping.restrictedDesc}</p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.shipping.availableTitle}</h3>
            <p className="mb-4">{t.shipping.availableDesc}</p>
            
            <p className="text-sm text-gray-500">{t.shipping.note}</p>
          </StaticPage>
        );

      case 'returns':
        return (
          <StaticPage title={t.returns.title} onBack={() => navigateTo('home')}>
             <p className="mb-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800 font-medium">
               {t.returns.note}
             </p>
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.returns.standardTitle}</h3>
             <p className="mb-4">{t.returns.standardDesc}</p>
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.returns.deliveredTitle}</h3>
             <p className="mb-4">{t.returns.deliveredDesc}</p>
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.returns.openedTitle}</h3>
             <p className="mb-4">{t.returns.openedDesc}</p>
             <h3 className="text-xl font-bold text-gray-900 mb-2">{t.returns.damagedTitle}</h3>
             <p className="mb-4">{t.returns.damagedDesc}</p>
          </StaticPage>
        );

      case 'faq':
        return (
          <StaticPage title={t.faq.title} onBack={() => navigateTo('home')}>
            <div className="space-y-6">
              {t.faq.items.map((item, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </StaticPage>
        );
      
      case 'track':
        return (
          <StaticPage title={t.track.title} onBack={() => navigateTo('home')}>
             <div className="max-w-2xl mx-auto">
               <p className="mb-8 text-gray-600 text-center">{t.track.desc}</p>
               <div className="flex gap-2 mb-8">
                 <input type="text" placeholder={t.track.placeholder} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none" />
                 <button className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors">
                   <Search size={20} />
                 </button>
               </div>
               
               {/* 模拟物流信息 */}
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-lg font-bold text-gray-900">Order #JP-8821</h3>
                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">In Transit</span>
                 </div>
                 
                 <div className="space-y-6">
                   <div className="flex">
                     <div className="flex flex-col items-center mr-4">
                       <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center">
                         <Check size={16} />
                       </div>
                       <div className="flex-1 w-0.5 bg-gray-200"></div>
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">Order Placed</h4>
                       <p className="text-sm text-gray-500">February 28, 2026 14:30</p>
                       <p className="mt-1 text-gray-600">Your order has been received and is being processed.</p>
                     </div>
                   </div>
                   
                   <div className="flex">
                     <div className="flex flex-col items-center mr-4">
                       <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center">
                         <Check size={16} />
                       </div>
                       <div className="flex-1 w-0.5 bg-gray-200"></div>
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">Order Shipped</h4>
                       <p className="text-sm text-gray-500">February 29, 2026 09:15</p>
                       <p className="mt-1 text-gray-600">Your order has been shipped via DHL. Tracking number: 1234567890</p>
                     </div>
                   </div>
                   
                   <div className="flex">
                     <div className="flex flex-col items-center mr-4">
                       <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center">
                         <Truck size={16} />
                       </div>
                       <div className="flex-1 w-0.5 bg-gray-200"></div>
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">In Transit</h4>
                       <p className="text-sm text-gray-500">March 2, 2026 16:45</p>
                       <p className="mt-1 text-gray-600">Your package is currently in transit to your destination.</p>
                     </div>
                   </div>
                   
                   <div className="flex">
                     <div className="flex flex-col items-center mr-4">
                       <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                         <Home size={16} />
                       </div>
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-400">Delivered</h4>
                       <p className="text-sm text-gray-400">Estimated: March 5, 2026</p>
                       <p className="mt-1 text-gray-400">Your package is expected to be delivered by this date.</p>
                     </div>
                   </div>
                 </div>
               </div>
               
               <p className="text-sm text-gray-400 text-center">{t.track.note}</p>
             </div>
          </StaticPage>
        );

      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative mb-6 px-4 container mx-auto">
              <div className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-2xl p-4 md:p-8 text-center relative overflow-hidden shadow-sm border border-white/50">
                <div className="relative z-10 max-w-lg mx-auto">
                    <span className="bg-white/70 backdrop-blur-sm text-brand-dark px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block shadow-sm">
                        {t.hero.newCollection}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 leading-tight">
                        {t.hero.title} <br/>
                        <span className="text-brand-accent">{t.hero.subtitle}</span>
                    </h1>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {t.hero.description}
                    </p>
                    <p className="text-xs text-brand-dark bg-white/70 backdrop-blur-sm p-2 rounded-lg mb-4">
                        <strong>Shipping Notice:</strong> Please check our shipping policy for available countries before ordering. We currently ship to most countries including the US, UK, Japan, Australia, New Zealand, Malaysia, and more. Some countries are restricted due to regulations.
                    </p>
                    <button 
                      onClick={() => {
                        const grid = document.getElementById('product-grid');
                        grid?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white text-brand-dark px-5 py-2 rounded-full font-bold hover:bg-brand-pink hover:text-white hover:shadow-md hover:-translate-y-1 transition-all shadow-sm text-sm"
                    >
                        {t.hero.cta}
                    </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-accent/20 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>
              </div>
            </section>

            {/* Product Grid */}
            <section id="product-grid" className="container mx-auto px-4 mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <LogoIcon className="text-brand-accent" size={24} />
                      {t.home.trending}
                    </h2>
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{PRODUCTS.length} {t.home.items}</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-8">
                  {PRODUCTS.filter(p => p.id === 'p14').map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} inventory={inventory[product.id]} />
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-accent mb-4">幸运盒子主题系列</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                  {PRODUCTS.filter(p => p.id !== 'p14').map((product) => {
                    const currentInventory = inventory[product.id] ?? product.inventory;
                    const isOutOfStock = currentInventory <= 0;
                    
                    return (
                      <div 
                        key={product.id} 
                        className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer ${isOutOfStock ? 'opacity-75' : ''}`}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <img 
                            src={publicImageById[product.id] || product.images[0]} 
                            alt={product.title[language]} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                              <span className="text-white font-bold text-sm md:text-base">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 md:p-5 flex-1 flex flex-col">
                          <h4 className="text-gray-900 font-bold text-sm md:text-base mb-2 leading-snug">
                            {product.title[language]}
                          </h4>
                          <div className="mt-auto">
                            <span className="text-base md:text-lg font-bold text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
                            {currentInventory > 0 && (
                              <div className="text-xs text-green-600 font-medium mt-1">
                                Only {currentInventory} left in stock
                              </div>
                            )}
                            {isOutOfStock && (
                              <div className="text-xs text-red-600 font-medium mt-1">
                                Out of stock? Contact us to pre-order
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </section>
          </>
        );
    }
  };

  const LanguageSelector = () => (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      {(['en', 'zh', 'es', 'ja'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 text-xs font-bold rounded-md uppercase transition-all ${
            language === lang ? 'bg-white text-brand-accent shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-gray-50/50 overflow-x-hidden">
    
      {/* Service Area Notification */}
      <div className="bg-yellow-100 border-b border-yellow-200 py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <p className="mb-1">
            If the item you wanted to purchase shows Out of Stock today, please don't worry. We restock a limited amount of inventory every day around 8:00 AM New York time and we will not close the shop for long periods.
          </p>
          <p className="mb-2">
            We process orders in the order they are received. For detailed information about order processing time and shipping duration, please refer to the <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline font-medium">Shipping Policy</button> section.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="font-medium">Service Area:</span>
            <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline">United States (CA, TX, & NY only)</button>
            <span className="text-gray-500">|</span>
            <span className="font-medium">For other countries and regions:</span>
            <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline">United States (excluding CA, TX, NY)</button>
            <span className="text-gray-500">|</span>
            <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline">European countries</button>
            <span className="text-gray-500">|</span>
            <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline">New Zealand, Australia</button>
            <span className="text-gray-500">|</span>
            <button onClick={() => navigateTo('shipping')} className="text-blue-600 hover:underline">Asia, Mexico, Canada</button>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'}`} style={{ top: '7.5rem' }}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <img src="/images/logo.jpg" alt="Logo" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-900">luckboxshop</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <button onClick={() => navigateTo('home')} className={`hover:text-brand-accent transition-colors ${currentView === 'home' ? 'text-brand-accent font-bold' : ''}`}>{t.nav.home}</button>
            <button onClick={() => navigateTo('all')} className={`hover:text-brand-accent transition-colors ${currentView === 'all' ? 'text-brand-accent font-bold' : ''}`}>{t.nav.all}</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-brand-accent transition-colors ${currentView === 'about' ? 'text-brand-accent font-bold' : ''}`}>{t.nav.about}</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-brand-accent transition-colors ${currentView === 'contact' ? 'text-brand-accent font-bold' : ''}`}>{t.nav.contact}</button>
            <button onClick={() => navigateTo('track')} className={`hover:text-brand-accent transition-colors ${currentView === 'track' ? 'text-brand-accent font-bold' : ''}`}>{t.nav.track}</button>
          </nav>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowCart(true)}
               className="relative text-gray-700 hover:text-brand-accent p-1"
             >
               <ShoppingCart size={24} />
               {totalItems > 0 && (
                 <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                   {totalItems}
                 </span>
               )}
             </button>
             
             {user ? (
               <div className="flex items-center gap-4">
                 <button 
                   onClick={() => setShowOrderHistory(true)}
                   className="text-gray-700 hover:text-brand-accent p-1"
                 >
                   <Package size={24} />
                 </button>
                 <div className="relative group">
                   <button className="text-gray-700 hover:text-brand-accent p-1">
                     <User size={24} />
                   </button>
                   <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-xl p-2 w-40 hidden group-hover:block">
                     <div className="px-4 py-2 border-b border-gray-100">
                       <p className="font-medium">{user.name}</p>
                       <p className="text-sm text-gray-500">{user.email}</p>
                     </div>
                     <button 
                       onClick={() => setShowOrderHistory(true)}
                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                     >
                       Order History
                     </button>
                     <button 
                       onClick={logout}
                       className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500"
                     >
                       Sign Out
                     </button>
                   </div>
                 </div>
               </div>
             ) : (
               <button 
                 onClick={() => setShowAuth(true)}
                 className="text-gray-700 hover:text-brand-accent p-1"
               >
                 <User size={24} />
               </button>
             )}
             
             <div className="hidden sm:block">
               <LanguageSelector />
             </div>
             <button className="md:hidden text-gray-700 hover:text-brand-accent p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-4 md:hidden animate-fade-in z-50">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                   <span className="text-sm text-gray-400 font-bold">Language</span>
                   <LanguageSelector />
                </div>
                <button onClick={() => navigateTo('home')} className="text-left py-3 font-medium hover:text-brand-accent border-b border-gray-50">{t.nav.home}</button>
                <button onClick={() => navigateTo('all')} className="text-left py-3 font-medium hover:text-brand-accent border-b border-gray-50">{t.nav.all}</button>
                <button onClick={() => navigateTo('about')} className="text-left py-3 font-medium hover:text-brand-accent border-b border-gray-50">{t.nav.about}</button>
                <button onClick={() => navigateTo('contact')} className="text-left py-3 font-medium hover:text-brand-accent border-b border-gray-50">{t.nav.contact}</button>
                <button onClick={() => navigateTo('track')} className="text-left py-3 font-medium hover:text-brand-accent border-b border-gray-50">{t.nav.track}</button>
                <button onClick={() => navigateTo('faq')} className="text-left py-3 font-medium hover:text-brand-accent">{t.nav.faq}</button>
            </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-48 md:pt-52">
        {renderContent()}
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-2 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">Chat with us</span>
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-6" onClick={() => navigateTo('home')}>
                         <div className="bg-brand-accent text-white p-1.5 rounded-md cursor-pointer">
                            <LogoIcon size={16} />
                        </div>
                        <span className="text-xl font-bold cursor-pointer hover:text-brand-accent transition-colors">{t.nav.brandName}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                        {t.footer.desc}
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => navigateTo('contact')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition-colors">
                            <Instagram size={18} />
                        </button>
                        <button onClick={() => navigateTo('contact')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition-colors">
                            <Mail size={18} />
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-6 text-gray-200 text-lg">{t.footer.care}</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><button onClick={() => navigateTo('shipping')} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>{t.nav.shipping}</button></li>
                        <li><button onClick={() => navigateTo('returns')} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>{t.nav.returns}</button></li>
                        <li><button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>{t.nav.faq}</button></li>
                        <li><button onClick={() => navigateTo('track')} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full"></span>{t.nav.track}</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-6 text-gray-200 text-lg">{t.footer.newsletter}</h3>
                    <p className="text-gray-400 text-sm mb-4">{t.footer.subDesc}</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm text-white w-full focus:ring-1 focus:ring-brand-accent outline-none" />
                        <button className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-accent/80 transition-colors">{t.footer.join}</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} {t.nav.brandName}. {t.footer.rights}</p>
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-gray-300">
                         <CreditCard size={14} /> VISA
                    </div>
                    <div className="bg-white/10 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-gray-300">
                         <CreditCard size={14} /> Mastercard
                    </div>
                    <div className="bg-white/10 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-gray-300">
                         <CreditCard size={14} /> PayPal
                    </div>
                </div>
                <p>{t.footer.tagline}</p>
            </div>
        </div>
      </footer>
      
      {/* Modals */}
      {showCart && (
        <Cart 
          onClose={() => setShowCart(false)} 
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }} 
        />
      )}
      
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} />
      )}
      
      {showCheckout && (
        <Checkout 
          onClose={() => setShowCheckout(false)} 
          onSuccess={() => {
            setShowCheckout(false);
            setShowSuccess(true);
          }} 
        />
      )}
      
      {showOrderHistory && (
        <OrderHistory onClose={() => setShowOrderHistory(false)} />
      )}
      
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mx-auto">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-500 mb-6">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            <button 
              onClick={() => {
                setShowSuccess(false);
                navigateTo('home');
              }}
              className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
