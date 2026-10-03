import React from 'react';
import { ArrowRight, Play, ShieldCheck, Zap, Globe, Star, LogIn } from 'lucide-react';

export default function Hero({ onGetStarted, onLogin, onExploreDemo }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      
      <div className="container hero-content">
        {/* Eye-catcher Badge */}
        <div className="hero-badge-wrapper">
          <span className="badge badge-primary">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }}></span>
            ✨ NexBill 2.0 Released: Modern Invoicing & Live Revenue Dashboard
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Invoicing Made <span className="text-gradient">Effortless</span>, Instant, & Intelligent.
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle">
          Create, send, and track professional invoices in seconds. Get paid up to 5x faster with seamless payment tracking, automated tax calculation, and real-time revenue analytics.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button onClick={() => onGetStarted()} className="btn btn-emerald-primary btn-lg shadow-emerald">
            Start 14-Day Free Trial <ArrowRight size={18} />
          </button>
          <button onClick={() => onLogin()} className="btn btn-secondary btn-lg">
            <LogIn size={16} /> Sign In to Dashboard
          </button>
          <button onClick={onExploreDemo} className="btn btn-ghost btn-lg">
            <Play size={16} fill="currentColor" /> Live Generator
          </button>
        </div>

        {/* User Rating / Social Proof Micro Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', color: '#f59e0b' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
            <strong>4.9/5</strong> rated by 2,400+ finance teams
          </span>
        </div>

        {/* Trust Badges Bar */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <Zap size={18} />
            <span>99.8% On-Time Payments</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={18} />
            <span>Bank-Grade 256-Bit Security</span>
          </div>
          <div className="trust-item">
            <Globe size={18} />
            <span>140+ Global Currencies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
