import React, { useState } from 'react';
import { FileText, ArrowRight, Check, Share2, Globe, MessageSquare } from 'lucide-react';

export default function Footer({ showToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to NexBill Product Updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div>
            <a href="#" className="brand-logo" style={{ color: '#ffffff' }}>
              <div className="brand-icon-box">
                <FileText size={24} />
              </div>
              <span>NexBill</span>
            </a>
            <p className="footer-brand-desc">
              The next-generation smart invoicing and billing platform engineered for modern SaaS, agencies, and global businesses.
            </p>

            {/* Newsletter Form */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
                Subscribe to updates
              </div>
              {subscribed ? (
                <div className="badge badge-success">
                  <Check size={14} /> You are subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', maxWidth: '300px' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="form-input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#ffffff', padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 0.85rem' }}>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#preview">Live Generator</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#benefits">Customer Benefits</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><a href="#">For SaaS & Startups</a></li>
              <li><a href="#">For Digital Agencies</a></li>
              <li><a href="#">For Freelancers</a></li>
              <li><a href="#">For Enterprise Cloud</a></li>
              <li><a href="#">Global Multi-Tax Engine</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Free Invoice Generator</a></li>
              <li><a href="#">Integrations Guide</a></li>
              <li><a href="#">Blog & Guides</a></li>
              <li><a href="#">Security & Compliance</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About NexBill</a></li>
              <li><a href="#">Careers (We're hiring!)</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', color: '#94a3b8' }}>
              <a href="#" style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }} title="Twitter / X">
                <Share2 size={18} />
              </a>
              <a href="#" style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }} title="Community">
                <MessageSquare size={18} />
              </a>
              <a href="#" style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }} title="Global Site">
                <Globe size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} NexBill Inc. All rights reserved. Made with precision.
          </div>

          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>All Systems Operational (99.99%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
