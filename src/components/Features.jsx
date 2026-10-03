import React from 'react';
import { 
  Zap, Clock, Globe, CreditCard, TrendingUp, Layout, 
  CheckCircle2, ArrowRight, ShieldAlert, Sparkles 
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      id: 1,
      icon: <Zap size={26} />,
      title: "Automated Subscription & Recurring Billing",
      description: "Set up auto-recurring invoices for retainers or SaaS subscriptions with custom frequencies (weekly, monthly, annual) and automated card retry logic.",
      span: 2,
      badge: "Automation"
    },
    {
      id: 2,
      icon: <Clock size={26} />,
      title: "Smart Escalations & Auto-Reminders",
      description: "Stop chasing unpaid bills manually. NexBill sends polite, scheduled SMS & Email reminders before, on, and after due dates.",
      span: 1,
      badge: "Zero Friction"
    },
    {
      id: 3,
      icon: <Globe size={26} />,
      title: "Multi-Currency & Global Tax Compliance",
      description: "Automatically calculate VAT, GST, and sales tax in 140+ currencies with real-time exchange rates & compliant tax invoice templates.",
      span: 1,
      badge: "Global"
    },
    {
      id: 4,
      icon: <CreditCard size={26} />,
      title: "1-Click Instant Payment Checkout",
      description: "Embed direct Stripe, PayPal, Apple Pay, Google Pay, or ACH direct debit payment links directly inside your digital PDF invoices.",
      span: 2,
      badge: "High Conversion"
    },
    {
      id: 5,
      icon: <TrendingUp size={26} />,
      title: "Real-Time Revenue Analytics Dashboard",
      description: "Track Monthly Recurring Revenue (MRR), pending receivables, paid invoice trends, and forecast cash flow with interactive charts.",
      span: 2,
      badge: "Analytics"
    },
    {
      id: 6,
      icon: <Layout size={26} />,
      title: "White-Label Client Portal",
      description: "Give your clients a custom-branded portal under your own domain to view, download, pay, and track all past receipts in one place.",
      span: 1,
      badge: "Custom Branding"
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary">
            <Sparkles size={14} /> Enterprise Features
          </span>
          <h2 className="section-title">
            Everything you need to <span className="text-gradient">automate revenue</span>
          </h2>
          <p className="section-subtitle">
            Built from the ground up for modern SaaS, agencies, freelancers, and growing global enterprises.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="features-grid">
          {featuresList.map((feat) => (
            <div key={feat.id} className={`feature-card ${feat.span === 2 ? 'span-2' : ''}`}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="feature-icon-wrapper">
                    {feat.icon}
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                    {feat.badge}
                  </span>
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.description}</p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 700, color: '#2563eb' }}>
                <span>Explore capability</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
