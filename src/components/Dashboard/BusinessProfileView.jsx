import React, { useState } from 'react';
import { Building2, Save, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function BusinessProfileView({ profile, onSaveProfile, showToast }) {
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    if (showToast) showToast('Business profile updated successfully!', 'success');
  };

  return (
    <div className="view-container">
      <div className="view-header-row">
        <div>
          <h2 className="view-title">Business Profile</h2>
          <p className="view-subtitle">Customize company metadata appearing on all your generated invoices.</p>
        </div>
      </div>

      <div className="profile-grid">
        <form onSubmit={handleSubmit} className="profile-form-card">
          <div className="card-header-styled">
            <Building2 size={20} className="text-emerald-600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Company Details</h3>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Company / Brand Name *</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.companyName || ''} 
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Business Owner / Contact Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.ownerName || ''} 
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Billing Email Address *</label>
              <input 
                type="email" 
                className="form-input" 
                value={formData.email || ''} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.phone || ''} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Tax ID / VAT Registration Number</label>
              <input 
                type="text" 
                className="form-input font-mono" 
                value={formData.taxId || ''} 
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Website URL</label>
              <input 
                type="url" 
                className="form-input" 
                value={formData.website || ''} 
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Business Address</label>
            <textarea 
              rows="3"
              className="form-textarea" 
              value={formData.address || ''} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Default Payment Terms & Notes</label>
            <textarea 
              rows="3"
              className="form-textarea" 
              value={formData.defaultTerms || ''} 
              onChange={(e) => setFormData({ ...formData, defaultTerms: e.target.value })}
            />
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn btn-emerald-primary btn-lg">
              <Save size={18} />
              <span>Save Business Profile</span>
            </button>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="profile-preview-card">
          <div className="card-header-styled">
            <ShieldCheck size={20} className="text-emerald-600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Branded Header Preview</h3>
          </div>

          <div className="preview-header-box">
            <div className="brand-logo-preview">
              <div className="brand-icon-emerald">
                <Building2 size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                  {formData.companyName || 'Company Name'}
                </h4>
                <span style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 600 }}>Verified Business Entity</span>
              </div>
            </div>

            <div className="preview-details-list">
              <div className="preview-detail-item">
                <Mail size={15} className="text-emerald-600" />
                <span>{formData.email || 'billing@nexbill.io'}</span>
              </div>
              <div className="preview-detail-item">
                <Phone size={15} className="text-emerald-600" />
                <span>{formData.phone || '+1 (800) 555-NEXB'}</span>
              </div>
              <div className="preview-detail-item">
                <MapPin size={15} className="text-emerald-600" />
                <span>{formData.address || 'Address not specified'}</span>
              </div>
              <div className="preview-detail-item">
                <Globe size={15} className="text-emerald-600" />
                <span>{formData.website || 'https://nexbill.io'}</span>
              </div>
            </div>

            <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.825rem', color: '#047857' }}>
              <strong>Tax Identification:</strong> {formData.taxId || 'US-987654321'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
