import React, { useState, useEffect } from 'react';
import { FileText, ArrowRight, Menu, X, User, LogOut, Sparkles, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onOpenAuth, user, onLogout, onOpenDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="top-banner">
        <span><Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Launch Offer: Get 20% off annual plans with code <strong>NEXBILL20</strong></span>
        <a href="#" onClick={(e) => { e.preventDefault(); if (user) { onOpenDashboard(); } else { onOpenAuth('login'); } }}>
          {user ? 'Open Dashboard →' : 'Sign In to Dashboard →'}
        </a>
      </div>

      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); if (user) onOpenDashboard(); }}>
            <div className="brand-icon-box">
              <FileText size={24} />
            </div>
            <span>NexBill</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><button onClick={() => scrollToSection('features')} className="nav-link">Features</button></li>
              <li><button onClick={() => scrollToSection('preview')} className="nav-link">Live Preview</button></li>
              <li><button onClick={() => scrollToSection('benefits')} className="nav-link">Benefits</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button></li>
            </ul>
          </nav>

          {/* Top Authentication Section */}
          <div className="nav-actions">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={onOpenDashboard} className="btn btn-emerald-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LayoutDashboard size={16} /> Open Dashboard
                </button>
                <button onClick={onLogout} className="btn btn-ghost" title="Log Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => onOpenAuth('login')} className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LogIn size={16} /> Log In
                </button>
                <button onClick={() => onOpenAuth('signup')} className="btn btn-emerald-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserPlus size={16} /> Sign Up <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <ul className="nav-links">
              <li><button onClick={() => scrollToSection('features')} className="nav-link">Features</button></li>
              <li><button onClick={() => scrollToSection('preview')} className="nav-link">Live Preview</button></li>
              <li><button onClick={() => scrollToSection('benefits')} className="nav-link">Benefits</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button></li>
            </ul>
            <div className="nav-actions">
              {user ? (
                <>
                  <button onClick={() => { setMobileMenuOpen(false); if (onOpenDashboard) onOpenDashboard(); }} className="btn btn-emerald-primary btn-full">
                    <LayoutDashboard size={16} /> Open Dashboard
                  </button>
                  <button onClick={onLogout} className="btn btn-secondary btn-full">
                    Log Out ({user.email})
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }} className="btn btn-emerald-primary btn-full">
                    <LogIn size={16} /> Log In & Open Dashboard
                  </button>
                  <button onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }} className="btn btn-secondary btn-full">
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
