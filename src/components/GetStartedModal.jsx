import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Sparkles, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function GetStartedModal({ isOpen, onClose, initialPlan = 'Professional', onGetStartedSuccess, showToast }) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!email || !fullName) {
      showToast('Please fill in your name and email', 'error');
      return;
    }
    setStep(2);
  };

  const handleCompleteRegistration = () => {
    setStep(3);
    showToast('Your NexBill 14-day trial has been activated!', 'success');
  };

  const handleFinish = () => {
    onGetStartedSuccess({
      email,
      name: fullName || email.split('@')[0],
      company: companyName || 'My Business',
      plan: selectedPlan
    });
    onClose();
    setStep(1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: step === 2 ? '640px' : '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Step 1: User & Company Info */}
        {step === 1 && (
          <>
            <div className="modal-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                <Sparkles size={14} /> 14-Day Free Trial
              </span>
              <h2 className="modal-title">Get Started with NexBill</h2>
              <p className="modal-subtitle">No credit card required. Instant 60-second account setup.</p>
            </div>

            <form onSubmit={handleStep1Submit} className="modal-form">
              <div className="form-group">
                <label>Company / Agency Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. Nexus Media Group"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Your Full Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Work Email</label>
                <input 
                  type="email" 
                  className="form-input"
                  placeholder="alex@nexusmedia.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Create Password</label>
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg">
                Continue to Plan Selection <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}

        {/* Step 2: Select Plan */}
        {step === 2 && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Choose Your Starting Plan</h2>
              <p className="modal-subtitle">Your first 14 days are completely free on any plan.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { name: 'Starter', price: '$15/mo', desc: 'Up to 30 invoices/mo' },
                { name: 'Professional', price: '$39/mo', desc: 'Unlimited invoices, subscriptions & portal', popular: true },
                { name: 'Enterprise', price: '$119/mo', desc: 'Custom SLA & dedicated account manager' }
              ].map((p) => (
                <div 
                  key={p.name}
                  onClick={() => setSelectedPlan(p.name)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: selectedPlan === p.name ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: selectedPlan === p.name ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: selectedPlan === p.name ? '6px solid #2563eb' : '2px solid #cbd5e1',
                      background: '#ffffff'
                    }}></div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{p.name}</span>
                        {p.popular && <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Recommended</span>}
                      </div>
                      <div style={{ fontSize: '0.825rem', color: '#64748b' }}>{p.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1d4ed8' }}>
                    {p.price}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ width: '30%' }}>
                Back
              </button>
              <button onClick={handleCompleteRegistration} className="btn btn-primary btn-full btn-lg">
                Activate Free Trial <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Success Confirmation Screen */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={40} />
            </div>

            <h2 className="modal-title" style={{ color: '#0f172a', marginBottom: '0.5rem' }}>
              Welcome to NexBill!
            </h2>
            <p className="modal-subtitle" style={{ marginBottom: '1.5rem' }}>
              Your <strong>14-Day Trial on {selectedPlan} Plan</strong> for <strong>{companyName || 'your organization'}</strong> is now live.
            </p>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700, color: '#0f172a' }}>
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>Account Activated</span>
              </div>
              <div style={{ color: '#64748b' }}>Account Email: <strong>{email}</strong></div>
              <div style={{ color: '#64748b' }}>Trial Expiry: <strong>14 days remaining</strong></div>
            </div>

            <button onClick={handleFinish} className="btn btn-primary btn-full btn-lg">
              Go to NexBill Workspace <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
