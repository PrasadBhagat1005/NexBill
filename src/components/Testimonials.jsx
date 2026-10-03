import React from 'react';
import { Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "NexBill completely eliminated late invoice payments for our agency. The automated SMS reminders alone saved us 15+ hours of finance work every month!",
      name: "Sarah Jenkins",
      role: "VP of Operations",
      company: "Apex Media Agency",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      quote: "The interactive live invoice builder and multi-currency support allowed us to scale seamlessly across 12 countries without worrying about local tax compliance.",
      name: "Marcus Vance",
      role: "Co-Founder & CEO",
      company: "CloudScale SaaS",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      quote: "Switching to NexBill was the best decision for our studio. Our clients love the 1-click Stripe checkout links inside digital PDF receipts.",
      name: "Elena Rostova",
      role: "Head of Product Design",
      company: "Vortex Design Labs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-primary">
            <Sparkles size={14} /> Customer Stories
          </span>
          <h2 className="section-title">
            Loved by <span className="text-gradient">thousands of finance teams</span>
          </h2>
          <p className="section-subtitle">
            See how companies use NexBill to speed up cash flow and automate billing operations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="testimonial-card">
              <div>
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">"{rev.quote}"</p>
              </div>

              <div className="author-info">
                <img src={rev.avatar} alt={rev.name} className="author-avatar" />
                <div>
                  <div className="author-name" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>{rev.name}</span>
                    <CheckCircle2 size={14} className="text-emerald-500" title="Verified Customer" />
                  </div>
                  <div className="author-role">{rev.role}, {rev.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
