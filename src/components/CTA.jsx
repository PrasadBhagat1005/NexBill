import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CTA({ onGetStarted }) {
  return (
    <section className="cta-banner-section">
      <div className="container cta-banner-inner">
        <span className="badge badge-accent" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
          <Sparkles size={14} /> Ready to Transform Your Invoicing?
        </span>

        <h2 className="cta-title">
          Start getting paid up to 5x faster today.
        </h2>
        <p className="cta-subtitle">
          Join 15,000+ businesses automating billing with NexBill. Get 14 days full access, no credit card required.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => onGetStarted()} className="btn btn-primary btn-lg" style={{ background: '#ffffff', color: '#1d4ed8' }}>
            Start 14-Day Free Trial <ArrowRight size={18} />
          </button>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#bfdbfe' }}>
          <span>✓ Instant setup</span>
          <span>✓ No credit card required</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
