import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialTab = 'login', initialPlan = 'Professional', onAuthSuccess, showToast }) {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupStep, setSignupStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialPlan) setSelectedPlan(initialPlan);
  }, [initialTab, initialPlan, isOpen]);

  if (!isOpen) return null;

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter your email and password', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        email: loginEmail,
        name: loginEmail.split('@')[0].replace('.', ' ')
      });
      showToast(`Welcome back to NexBill, ${loginEmail.split('@')[0]}!`, 'success');
      onClose();
    }, 500);
  };

  const handleSignupStep1 = (e) => {
    e.preventDefault();
    if (!signupEmail || !fullName) {
      showToast('Please fill in your name and work email', 'error');
      return;
    }
    setSignupStep(2);
  };

  const handleCompleteSignup = () => {
    setSignupStep(3);
    showToast('Your NexBill 14-day trial has been activated!', 'success');
  };

  const handleFinishSignup = () => {
    onAuthSuccess({
      email: signupEmail,
      name: fullName || signupEmail.split('@')[0],
      company: companyName || 'My Business',
      plan: selectedPlan
    });
    onClose();
    setSignupStep(1);
  };

  const handleSocialAuth = (provider) => {
    const userEmail = activeTab === 'login' ? `user@${provider.toLowerCase()}.com` : `newuser@${provider.toLowerCase()}.com`;
    onAuthSuccess({
      email: userEmail,
      name: `${provider} User`
    });
    showToast(`Authenticated successfully via ${provider}`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: activeTab === 'signup' && signupStep === 2 ? '640px' : '480px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        {/* Top Authentication Mode Tabs */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setSignupStep(1); }}
          >
            <LogIn size={16} /> Log In
          </button>
          <button 
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            <UserPlus size={16} /> Sign Up / Free Trial
          </button>
        </div>

        {/* ==================== LOG IN TAB ==================== */}
        {activeTab === 'login' && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Welcome Back</h2>
              <p className="modal-subtitle">Log in to manage your NexBill invoices and revenue dashboard</p>
            </div>

            {/* Quick Social Logins */}
            <div className="social-login-group">
              <button onClick={() => handleSocialAuth('Google')} className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                </svg>
                Google
              </button>
              
              <button onClick={() => handleSocialAuth('GitHub')} className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </button>
            </div>

            <div className="divider">or sign in with email</div>

            <form onSubmit={handleLoginSubmit} className="modal-form">
              <div className="form-group">
                <label>Work Email</label>
                <input 
                  type="email" 
                  className="form-input"
                  placeholder="alex@company.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to your email', 'info'); }} style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-emerald-primary btn-full btn-lg" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}

        {/* ==================== SIGN UP TAB ==================== */}
        {activeTab === 'signup' && (
          <>
            {signupStep === 1 && (
              <>
                <div className="modal-header">
                  <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                    <Sparkles size={14} /> 14-Day Free Trial
                  </span>
                  <h2 className="modal-title">Create Your NexBill Account</h2>
                  <p className="modal-subtitle">No credit card required. 60-second instant setup.</p>
                </div>

                <div className="social-login-group">
                  <button onClick={() => handleSocialAuth('Google')} className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                    </svg>
                    Google
                  </button>
                  
                  <button onClick={() => handleSocialAuth('GitHub')} className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="divider">or register with email</div>

                <form onSubmit={handleSignupStep1} className="modal-form">
                  <div className="form-group">
                    <label>Company / Organization Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Apex Growth Labs"
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
                      placeholder="alex@apexgrowth.io"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Create Password</label>
                    <input 
                      type="password" 
                      className="form-input"
                      placeholder="At least 8 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full btn-lg">
                    Continue to Select Plan <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}

            {signupStep === 2 && (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">Select Your Starting Plan</h2>
                  <p className="modal-subtitle">First 14 days completely free. Upgrade or downgrade anytime.</p>
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
                  <button onClick={() => setSignupStep(1)} className="btn btn-secondary" style={{ width: '30%' }}>
                    Back
                  </button>
                  <button onClick={handleCompleteSignup} className="btn btn-primary btn-full btn-lg">
                    Activate 14-Day Free Trial <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}

            {signupStep === 3 && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={40} />
                </div>

                <h2 className="modal-title" style={{ color: '#0f172a', marginBottom: '0.5rem' }}>
                  Welcome to NexBill!
                </h2>
                <p className="modal-subtitle" style={{ marginBottom: '1.5rem' }}>
                  Your <strong>14-Day Free Trial on {selectedPlan} Plan</strong> for <strong>{companyName || 'your business'}</strong> is live.
                </p>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 700, color: '#0f172a' }}>
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <span>Account Active</span>
                  </div>
                  <div style={{ color: '#64748b' }}>Email: <strong>{signupEmail}</strong></div>
                  <div style={{ color: '#64748b' }}>Plan: <strong>{selectedPlan} (14 Days Free)</strong></div>
                </div>

                <button onClick={handleFinishSignup} className="btn btn-primary btn-full btn-lg">
                  Go to NexBill Dashboard <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
