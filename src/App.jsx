import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InvoicePreview from './components/InvoicePreview';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import DashboardLayout from './components/Dashboard/DashboardLayout';

const USER_STORAGE_KEY = 'nexbill_current_user_v2';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'signup'
  const [selectedPlan, setSelectedPlan] = useState('Professional');
  
  // Load logged in user from localStorage (null if not logged in)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [currentView, setCurrentView] = useState(() => {
    return user ? 'dashboard' : 'landing';
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenAuth = (tab = 'login', planName = 'Professional') => {
    setAuthTab(tab);
    setSelectedPlan(planName);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    setCurrentView('dashboard');
    showToast(`Welcome back, ${userData.name || 'User'}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentView('landing');
    showToast('Logged out of NexBill account', 'info');
  };

  const handleExploreDemo = () => {
    const previewEl = document.getElementById('preview');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user is authenticated and in dashboard view
  if (currentView === 'dashboard' && user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <DashboardLayout 
          user={user} 
          onLogout={handleLogout} 
          showToast={showToast} 
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  // Otherwise render Landing Page with Sign In protection
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <Navbar 
        onOpenAuth={(tab) => handleOpenAuth(tab)}
        user={user}
        onLogout={handleLogout}
        onOpenDashboard={() => {
          if (user) {
            setCurrentView('dashboard');
          } else {
            handleOpenAuth('login');
          }
        }}
      />

      {/* Main Content */}
      <main>
        <Hero 
          onGetStarted={() => handleOpenAuth('signup')}
          onLogin={() => handleOpenAuth('login')}
          onExploreDemo={handleExploreDemo}
        />

        <InvoicePreview 
          showToast={showToast}
        />

        <Features />

        <Benefits />

        <Pricing 
          onSelectPlan={(planName) => handleOpenAuth('signup', planName)}
        />

        <Testimonials />

        <FAQ />

        <CTA 
          onGetStarted={() => handleOpenAuth('signup')}
        />
      </main>

      {/* Footer */}
      <Footer 
        showToast={showToast}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        initialPlan={selectedPlan}
        onAuthSuccess={handleAuthSuccess}
        showToast={showToast}
      />

      {/* Toast Manager */}
      <Toast 
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
