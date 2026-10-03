import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Bell, Shield, Hash, DollarSign, CheckCircle2 } from 'lucide-react';

export default function SettingsView({ profile, onSaveProfile, onResetDemoData, showToast }) {
  const [invoicePrefix, setInvoicePrefix] = useState(profile?.invoicePrefix || 'INV-2026-');
  const [defaultTaxRate, setDefaultTaxRate] = useState(profile?.defaultTaxRate || 10);
  const [currency, setCurrency] = useState(profile?.currency || '$');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoReminder, setAutoReminder] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      invoicePrefix,
      defaultTaxRate: parseFloat(defaultTaxRate) || 0,
      currency
    });
    if (showToast) showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="view-container">
      <div className="view-header-row">
        <div>
          <h2 className="view-title">Dashboard Settings</h2>
          <p className="view-subtitle">Configure invoice defaults, numbering format, and system preferences.</p>
        </div>
      </div>

      <div className="settings-grid">
        <form onSubmit={handleSave} className="settings-card">
          <div className="card-header-styled">
            <Hash size={20} className="text-emerald-600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Invoice Defaults & Format</h3>
          </div>

          <div className="form-group">
            <label>Default Invoice Prefix</label>
            <input 
              type="text" 
              className="form-input font-mono font-bold" 
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value)}
            />
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Example generated ID: {invoicePrefix}0042</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Default Currency</label>
              <select 
                className="form-select font-semibold"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="$">$ USD (United States Dollar)</option>
                <option value="€">€ EUR (Euro)</option>
                <option value="£">£ GBP (British Pound)</option>
                <option value="₹">₹ INR (Indian Rupee)</option>
                <option value="C$">C$ CAD (Canadian Dollar)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Default Tax Rate (%)</label>
              <input 
                type="number" 
                className="form-input" 
                value={defaultTaxRate}
                onChange={(e) => setDefaultTaxRate(e.target.value)}
              />
            </div>
          </div>

          <div className="card-header-styled" style={{ marginTop: '1.5rem' }}>
            <Bell size={20} className="text-emerald-600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Notifications & Automated Alerts</h3>
          </div>

          <div className="toggle-row">
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>Email Notifications</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Receive instant emails when a client views or pays an invoice</div>
            </div>
            <input 
              type="checkbox" 
              checked={emailNotifications} 
              onChange={(e) => setEmailNotifications(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
            />
          </div>

          <div className="toggle-row">
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>Automatic Overdue Payment Reminders</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Send automated email reminders 3 days before and after due date</div>
            </div>
            <input 
              type="checkbox" 
              checked={autoReminder} 
              onChange={(e) => setAutoReminder(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#059669', cursor: 'pointer' }}
            />
          </div>

          <div className="form-actions-row" style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-emerald-primary btn-lg">
              <Save size={18} />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>

        {/* System Management Card */}
        <div className="settings-card">
          <div className="card-header-styled">
            <RefreshCw size={20} className="text-emerald-600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Data Management & Demo Utilities</h3>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Reset invoice repository to initial high-quality sample data if you want to test clean statistics.
          </p>

          <button 
            type="button"
            onClick={onResetDemoData} 
            className="btn btn-secondary"
            style={{ color: '#059669', borderColor: '#a7f3d0', background: '#ecfdf5' }}
          >
            <RefreshCw size={16} /> Restore Sample Invoices & Clients
          </button>
        </div>
      </div>
    </div>
  );
}
