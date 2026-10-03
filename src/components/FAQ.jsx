import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How fast can I set up and start sending invoices with NexBill?",
      a: "You can send your first professional invoice in under 60 seconds! No credit card is required to sign up for our 14-day free trial. Simply customize your business details or select a template, add your line items, and send."
    },
    {
      q: "Can I connect my own payment gateway like Stripe or PayPal?",
      a: "Yes! NexBill seamlessly connects with Stripe, PayPal, Apple Pay, Google Pay, and direct ACH bank transfer providers. Payment checkout links are automatically embedded directly into your invoices."
    },
    {
      q: "How does NexBill handle international currencies and sales taxes?",
      a: "NexBill features an integrated multi-currency and tax engine that supports over 140 currencies. It automatically applies proper regional VAT, GST, or state sales tax rules based on your client's location."
    },
    {
      q: "Can I customize invoices with my company logo, brand colors, and custom domain?",
      a: "Absolutely. All paid plans include full white-label capabilities. You can upload high-res logos, customize brand accent colors, set custom invoice numbering formats, and host client payment portals under your own custom domain."
    },
    {
      q: "Is my financial data secure with NexBill?",
      a: "Security is our highest priority. All data is encrypted using enterprise-grade 256-bit SSL encryption in transit and at rest. We comply with SOC2 Type II standards and PCI-DSS requirements."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary">
            <Sparkles size={14} /> Got Questions?
          </span>
          <h2 className="section-title">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about getting started with NexBill.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-container">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="faq-item">
                <button className="faq-question-btn" onClick={() => toggleFAQ(idx)}>
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: isOpen ? '#2563eb' : '#64748b'
                    }} 
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
