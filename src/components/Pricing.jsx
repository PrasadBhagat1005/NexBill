import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function Pricing({ onSelectPlan }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      desc: 'Ideal for freelancers and indie hackers starting out.',
      monthlyPrice: 19,
      annualPrice: 15,
      popular: false,
      features: [
        'Up to 30 Invoices / month',
        'Single User Access',
        'Stripe & PayPal Integration',
        'Basic Payment Reminders',
        'Standard Email Support',
        'Standard PDF Templates'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      desc: 'Perfect for growing agencies, SMBs, and scaling SaaS teams.',
      monthlyPrice: 49,
      annualPrice: 39,
      popular: true,
      features: [
        'Unlimited Invoices & Receipts',
        'Up to 5 Team Members',
        'Automated Subscription Billing',
        'Custom Branded Client Portal',
        '140+ Currencies & Multi-Tax',
        'Smart SMS & Email Escalations',
        'Priority 24/7 Chat Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      desc: 'For large organizations needing custom workflows & dedicated SLA.',
      monthlyPrice: 149,
      annualPrice: 119,
      popular: false,
      features: [
        'Everything in Professional',
        'Unlimited Team Seats',
        'Dedicated Account Manager',
        'Custom ERP & QuickBooks Sync',
        'Custom Domain & SSL Setup',
        '99.99% Guaranteed SLA Uptime',
        'Custom Contract & SOC2 Audit'
      ]
    }
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary">
            <Sparkles size={14} /> Transparent Pricing
          </span>
          <h2 className="section-title">
            Simple, predictable <span className="text-gradient">plans for every team</span>
          </h2>
          <p className="section-subtitle">
            No hidden setup fees. Change or cancel your subscription at any time.
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="pricing-toggle-container">
          <span style={{ fontWeight: !annual ? 700 : 500, color: !annual ? '#0f172a' : '#64748b' }}>
            Monthly Billing
          </span>
          
          <div 
            className={`toggle-switch ${annual ? 'active' : ''}`}
            onClick={() => setAnnual(!annual)}
            role="button"
            aria-label="Toggle annual pricing"
          >
            <div className="toggle-knob"></div>
          </div>

          <span style={{ fontWeight: annual ? 700 : 500, color: annual ? '#0f172a' : '#64748b' }}>
            Annual Billing
          </span>
          <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
            Save 20%
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.desc}</p>
                  
                  <div className="plan-price-box">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{price}</span>
                    <span className="price-period">/ month</span>
                  </div>

                  <ul className="plan-features-list">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="feature-check-item">
                        <Check size={18} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => onSelectPlan(plan.name, price, annual ? 'Annual' : 'Monthly')}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                >
                  Get Started with {plan.name} <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
