import React, { useState } from 'react';
import { X, UserPlus, Save, Mail, Phone, Building2, MapPin } from 'lucide-react';

export default function AddClientModal({ isOpen, onClose, onSaveClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please provide client name and email');
      return;
    }
    const newClient = {
      id: `c_${Date.now()}`,
      name,
      email,
      phone,
      company: company || name,
      address
    };
    onSaveClient(newClient);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setAddress('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="modal-icon-badge">
              <UserPlus size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="modal-title">Add New Client</h2>
              <p className="modal-subtitle">Save client details for quick invoice generation.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" style={{ marginTop: '1.25rem' }}>
          <div className="form-group">
            <label>Client Name *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Apex Growth Labs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Client Email *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="billing@apexgrowth.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Company / Organization Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Apex Growth Labs Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Billing Address</label>
            <textarea 
              rows="2"
              className="form-textarea" 
              placeholder="Street, City, State, ZIP, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="modal-actions-bar" style={{ marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald-primary btn-lg">
              <Save size={18} />
              <span>Save Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
