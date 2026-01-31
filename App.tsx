
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import LegalModal, { LegalType } from './components/LegalModal';
import AIChat from './components/AIChat';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import AuthModal, { AuthMode } from './components/AuthModal';
import CheckoutPage from './components/CheckoutPage';
import { ArrowUp, History } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(Category.ALL);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalType | null>(null);
  
  // Auth state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{ product: Product, quantity: number } | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCollection = () => {
    const element = document.getElementById('collection-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchClick = () => {
    scrollToTop();
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input') || document.querySelector('input[placeholder="Search for treasures..."]');
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 500);
  };

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const handleDirectCheckout = (product: Product, quantity: number) => {
    setCheckoutData({ product, quantity });
    setIsCheckoutOpen(true);
    setSelectedProduct(null); // Close details modal if open
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === Category.ALL || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const isAlreadyWishlisted = prev.some(item => item.id === product.id);
      if (isAlreadyWishlisted) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onCategoryChange={setActiveCategory} 
        onMenuClick={() => setIsSidebarOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onAuthClick={() => openAuth('login')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onCategoryChange={setActiveCategory}
        onLoginClick={() => openAuth('login')}
        onRegisterClick={() => openAuth('register')}
      />

      <main className="flex-grow pb-16">
        {activeCategory === Category.ALL && !searchQuery && (
          <Hero onShopNowClick={scrollToCollection} />
        )}

        <div id="collection-section" className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-4 md:py-8 scroll-mt-20">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 px-3 md:px-0 space-y-4 md:space-y-0">
            <div>
              <p className="text-amber-600 font-semibold tracking-[0.3em] uppercase text-[10px] mb-2">
                {searchQuery ? 'Searching Collection' : 'Exquisite Collection'}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold luxury-font text-slate-900">
                {searchQuery ? `Results for "${searchQuery}"` : (activeCategory === Category.ALL ? 'Nashwa Selects' : activeCategory)}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4 border-b border-slate-200 pb-2">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'masterpiece' : 'masterpieces'}
              </span>
            </div>
          </div>

          {/* Grid: Updated to 4 columns on mobile */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onViewDetails={handleViewDetails}
                  isWishlisted={wishlistItems.some(item => item.id === product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mx-3">
              <p className="text-slate-400 text-sm">No treasures found matching your request.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(Category.ALL);
                }}
                className="mt-4 text-amber-600 text-xs font-bold uppercase tracking-widest hover:underline"
              >
                Reset Exploration
              </button>
            </div>
          )}

          {/* Recently Viewed Section */}
          {recentlyViewed.length > 0 && (
            <div className="mt-20 pt-16 border-t border-slate-100 px-3 md:px-0">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-slate-50 rounded-full text-amber-600">
                  <History size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold luxury-font text-slate-900">Your Recent Discoveries</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Continuing your journey of elegance</p>
                </div>
              </div>
              
              <div className="flex space-x-1 md:space-x-8 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {recentlyViewed.map(product => (
                  <div key={product.id} className="w-[24%] min-w-[85px] md:w-56 flex-shrink-0">
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      onViewDetails={handleViewDetails}
                      isWishlisted={wishlistItems.some(item => item.id === product.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Details Modal/Overlay */}
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onDirectCheckout={handleDirectCheckout}
          onViewDetails={handleViewDetails}
          isWishlisted={wishlistItems.some(item => item.id === selectedProduct.id)}
        />
      )}

      {/* Checkout Page Overlay */}
      {isCheckoutOpen && checkoutData && (
        <CheckoutPage 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={checkoutData.product}
          quantity={checkoutData.quantity}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />

      {/* Legal Documents Modal */}
      <LegalModal 
        type={activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
      />

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed right-4 bottom-20 md:right-8 md:bottom-24 z-40 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition-all transform hover:scale-110 active:scale-95 animate-in zoom-in"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <footer className="bg-white border-t border-slate-100 pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-2xl md:text-3xl font-bold tracking-[0.4em] luxury-font gradient-gold-text mb-8 block">
            NASHWA
          </span>
          <p className="text-slate-400 max-w-lg mx-auto text-xs leading-relaxed mb-10 font-light">
            Crafting a world of elegance, one piece at a time. Authenticity and luxury redefined for the modern connoisseur.
          </p>
          <div className="flex justify-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-10">
            <button onClick={() => setActiveLegalDoc('privacy')} className="hover:text-amber-600 transition-colors">Privacy</button>
            <button onClick={() => setActiveLegalDoc('terms')} className="hover:text-amber-600 transition-colors">Terms</button>
            <button onClick={() => setActiveLegalDoc('contact')} className="hover:text-amber-600 transition-colors">Contact</button>
          </div>
          <p className="text-[9px] text-slate-300 uppercase tracking-widest">© 2024 Nashwa Luxury Group. All Rights Reserved.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      <BottomNav 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <AIChat />
    </div>
  );
};

export default App;
