import React from 'react';
import { CheckCircle2, XCircle, TrendingUp, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Benefits() {
  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-bg-glow"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-accent" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Sparkles size={14} /> Proven Results
          </span>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            Why finance leaders choose <span className="text-gradient">NexBill</span>
          </h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Replace manual spreadsheets and clunky legacy software with high-speed automated financial infrastructure.
          </p>
        </div>

        {/* Impact Numbers Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">5x</div>
            <div className="metric-label">Faster Invoice Clearance</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">$2.4B+</div>
            <div className="metric-label">Processed Invoices</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">99.99%</div>
            <div className="metric-label">System Reliability Uptime</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">15,000+</div>
            <div className="metric-label">Active Global Business Customers</div>
          </div>
        </div>

        {/* Comparison Box: Traditional vs NexBill */}
        <div className="comparison-wrapper">
          
          {/* Traditional Way */}
          <div className="comparison-box before">
            <div className="comparison-header before-title">
              <XCircle size={24} />
              <span>Traditional Invoicing</span>
            </div>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span style={{ color: '#ef4444' }}>✕</span> Manual Word/Excel template edits prone to calculation mistakes
              </li>
              <li className="comparison-item">
                <span style={{ color: '#ef4444' }}>✕</span> Average 24 days delayed payment waiting for wire transfers
              </li>
              <li className="comparison-item">
                <span style={{ color: '#ef4444' }}>✕</span> Awkward manual email follow-ups for late payments
              </li>
              <li className="comparison-item">
                <span style={{ color: '#ef4444' }}>✕</span> Complex, confusing international tax and currency conversion
              </li>
            </ul>
          </div>

          {/* NexBill Way */}
          <div className="comparison-box after">
            <div className="comparison-header after-title">
              <CheckCircle2 size={24} />
              <span>The NexBill Way</span>
            </div>
            <ul className="comparison-list">
              <li className="comparison-item">
                <span style={{ color: '#10b981' }}>✓</span> 1-Click dynamic invoice generation with instant total & tax accuracy
              </li>
              <li className="comparison-item">
                <span style={{ color: '#10b981' }}>✓</span> Embedded 1-click payment checkout links (Paid in under 48 hours)
              </li>
              <li className="comparison-item">
                <span style={{ color: '#10b981' }}>✓</span> Automated polite email & SMS reminder workflows
              </li>
              <li className="comparison-item">
                <span style={{ color: '#10b981' }}>✓</span> Instant multi-currency engine with automatic local tax compliance
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
