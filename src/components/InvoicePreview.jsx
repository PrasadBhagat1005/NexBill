import React, { useState } from 'react';
import { 
  FileText, Plus, Trash2, Printer, Download, Send, CheckCircle, 
  RefreshCw, DollarSign, Sparkles, Building2, Calendar, ShieldCheck 
} from 'lucide-react';

const PRESETS = {
  saas: {
    clientName: 'Acme SaaS Corp',
    clientEmail: 'billing@acme.io',
    clientAddress: '100 Silicon Way, San Francisco, CA',
    invoiceNumber: 'INV-2026-0042',
    date: '2026-10-03',
    dueDate: '2026-10-17',
    status: 'paid',
    currency: '$',
    taxRate: 10,
    discount: 5,
    items: [
      { id: 1, description: 'NexBill Enterprise SaaS Platform (Monthly)', qty: 1, price: 499 },
      { id: 2, description: 'Dedicated Priority Support & SLA', qty: 1, price: 150 },
      { id: 3, description: 'Custom Domain SSL Certificate Integration', qty: 2, price: 50 }
    ]
  },
  consulting: {
    clientName: 'Starlight Design Studios',
    clientEmail: 'finance@starlight.design',
    clientAddress: '45 Creative Blvd, Austin, TX',
    invoiceNumber: 'INV-2026-0108',
    date: '2026-10-01',
    dueDate: '2026-10-15',
    status: 'pending',
    currency: '$',
    taxRate: 8,
    discount: 0,
    items: [
      { id: 1, description: 'UI/UX Design Systems Sprint', qty: 40, price: 125 },
      { id: 2, description: 'Front-End React Component Audit', qty: 15, price: 140 }
    ]
  },
  agency: {
    clientName: 'Vortex Growth Agency',
    clientEmail: 'accounts@vortexagency.com',
    clientAddress: '12 Piccadilly Circus, London, UK',
    invoiceNumber: 'INV-2026-0991',
    date: '2026-09-28',
    dueDate: '2026-10-12',
    status: 'overdue',
    currency: '£',
    taxRate: 20,
    discount: 10,
    items: [
      { id: 1, description: 'Monthly Growth Marketing Retainer', qty: 1, price: 2500 },
      { id: 2, description: 'SEO Performance Optimization', qty: 1, price: 800 }
    ]
  }
};

export default function InvoicePreview({ showToast }) {
  const [activePreset, setActivePreset] = useState('saas');
  const [invoice, setInvoice] = useState(PRESETS.saas);

  const handlePresetSelect = (key) => {
    setActivePreset(key);
    setInvoice(PRESETS[key]);
    showToast('Loaded ' + PRESETS[key].clientName + ' template', 'info');
  };

  const handleFieldChange = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const val = field === 'price' || field === 'qty' ? parseFloat(value) || 0 : value;
          return { ...item, [field]: val };
        }
        return item;
      })
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: 'New Service Item',
      qty: 1,
      price: 100
    };
    setInvoice(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const deleteItem = (id) => {
    if (invoice.items.length <= 1) {
      showToast('Invoice must have at least one line item', 'error');
      return;
    }
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Math Calculations
  const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const discountAmount = (subtotal * (invoice.discount / 100));
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * (invoice.taxRate / 100));
  const grandTotal = taxableAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    showToast(`Generating PDF for ${invoice.invoiceNumber}...`, 'success');
  };

  const handleSendEmail = () => {
    showToast(`Invoice ${invoice.invoiceNumber} sent to ${invoice.clientEmail}!`, 'success');
  };

  return (
    <section id="preview" className="preview-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-accent">
            <Sparkles size={14} /> Interactive Live Builder
          </span>
          <h2 className="section-title">
            Test the <span className="text-gradient">NexBill Invoice Engine</span> live
          </h2>
          <p className="section-subtitle">
            Customize details, tweak line items, toggle currencies, and watch the calculated invoice render dynamically in real-time.
          </p>
        </div>

        {/* Invoice Generator Card Grid */}
        <div className="invoice-preview-card">
          
          {/* Controls Bar */}
          <div className="preview-controls">
            <div className="controls-header">
              <div className="controls-title">
                <FileText size={18} className="text-primary-600" />
                <span>Invoice Settings</span>
              </div>
              <button 
                onClick={() => handlePresetSelect(activePreset)} 
                className="btn btn-ghost"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                title="Reset Template"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            {/* Quick Templates Switcher */}
            <div className="preset-buttons">
              <span className="preset-label">Sample Templates</span>
              <button 
                className={`preset-btn ${activePreset === 'saas' ? 'active' : ''}`}
                onClick={() => handlePresetSelect('saas')}
              >
                ⚡ SaaS Subscription
              </button>
              <button 
                className={`preset-btn ${activePreset === 'consulting' ? 'active' : ''}`}
                onClick={() => handlePresetSelect('consulting')}
              >
                🎨 Design Consulting
              </button>
              <button 
                className={`preset-btn ${activePreset === 'agency' ? 'active' : ''}`}
                onClick={() => handlePresetSelect('agency')}
              >
                🚀 Agency Retainer
              </button>
            </div>

            {/* Editable Input Fields */}
            <div className="control-field">
              <label>Client / Company Name</label>
              <input 
                type="text" 
                className="control-input"
                value={invoice.clientName}
                onChange={(e) => handleFieldChange('clientName', e.target.value)}
              />
            </div>

            <div className="control-field">
              <label>Client Email Address</label>
              <input 
                type="email" 
                className="control-input"
                value={invoice.clientEmail}
                onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="control-field">
                <label>Currency</label>
                <select 
                  className="control-select"
                  value={invoice.currency}
                  onChange={(e) => handleFieldChange('currency', e.target.value)}
                >
                  <option value="$">$ USD</option>
                  <option value="€">€ EUR</option>
                  <option value="£">£ GBP</option>
                  <option value="₹">₹ INR</option>
                </select>
              </div>

              <div className="control-field">
                <label>Payment Status</label>
                <select 
                  className="control-select"
                  value={invoice.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="control-field">
                <label>Tax Rate (%)</label>
                <input 
                  type="number" 
                  className="control-input"
                  min="0"
                  max="50"
                  value={invoice.taxRate}
                  onChange={(e) => handleFieldChange('taxRate', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="control-field">
                <label>Discount (%)</label>
                <input 
                  type="number" 
                  className="control-input"
                  min="0"
                  max="100"
                  value={invoice.discount}
                  onChange={(e) => handleFieldChange('discount', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: 'auto' }}>
              <button onClick={handleSendEmail} className="btn btn-primary btn-full">
                <Send size={16} /> Send Invoice to Client
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button onClick={handleExportPDF} className="btn btn-secondary">
                  <Download size={14} /> Download PDF
                </button>
                <button onClick={handlePrint} className="btn btn-secondary">
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
          </div>

          {/* Paper Invoice Preview Container */}
          <div className="preview-paper-container" id="printable-invoice">
            <div>
              {/* Invoice Header Row */}
              <div className="invoice-header-row">
                <div className="invoice-brand">
                  <div className="brand-icon-box" style={{ width: '44px', height: '44px' }}>
                    <FileText size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>NexBill Inc.</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Smart Invoicing Solutions</p>
                  </div>
                </div>

                <div className="invoice-title-box">
                  <h2 className="invoice-title-text">INVOICE</h2>
                  <div className="invoice-number-tag">{invoice.invoiceNumber}</div>
                  <div style={{ marginTop: '0.35rem' }}>
                    <span className={`status-pill status-${invoice.status}`}>
                      ● {invoice.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Client & Metadata Info */}
              <div className="invoice-details-grid">
                <div>
                  <div className="info-block-title">Billed To</div>
                  <div className="info-block-content">{invoice.clientName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{invoice.clientEmail}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{invoice.clientAddress}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="info-block-title">Invoice Date</div>
                  <div className="info-block-content" style={{ fontSize: '0.9rem' }}>{invoice.date}</div>
                  <div className="info-block-title" style={{ marginTop: '0.75rem' }}>Payment Due</div>
                  <div className="info-block-content" style={{ fontSize: '0.9rem', color: '#2563eb' }}>{invoice.dueDate}</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th style={{ textAlign: 'center', width: '70px' }}>Qty</th>
                    <th style={{ textAlign: 'right', width: '110px' }}>Price</th>
                    <th style={{ textAlign: 'right', width: '110px' }}>Total</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input 
                          type="text" 
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          style={{
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            fontWeight: 600,
                            color: '#0f172a',
                            outline: 'none'
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input 
                          type="number" 
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                          style={{
                            width: '50px',
                            textAlign: 'center',
                            border: '1px solid #e2e8f0',
                            borderRadius: '4px',
                            padding: '0.2rem',
                            outline: 'none'
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 500 }}>
                        {invoice.currency}
                        <input 
                          type="number" 
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                          style={{
                            width: '70px',
                            textAlign: 'right',
                            border: 'none',
                            background: 'transparent',
                            outline: 'none'
                          }}
                        />
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                        {invoice.currency}{(item.qty * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => deleteItem(item.id)} 
                          style={{ color: '#94a3b8', background: 'transparent', padding: '0.2rem' }}
                          title="Remove line item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button 
                onClick={addItem} 
                className="btn btn-ghost" 
                style={{ fontSize: '0.85rem', color: '#2563eb', padding: '0.4rem 0.6rem', marginBottom: '1.5rem' }}
              >
                <Plus size={16} /> Add Line Item
              </button>
            </div>

            {/* Totals Summary & Notes */}
            <div>
              <div className="invoice-totals-wrapper">
                <div className="invoice-totals-box">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>{invoice.currency}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="total-row" style={{ color: '#059669' }}>
                      <span>Discount ({invoice.discount}%)</span>
                      <span>-{invoice.currency}{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="total-row">
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span>+{invoice.currency}{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total Amount</span>
                    <span>{invoice.currency}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="invoice-footer-notes">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Secured by NexBill Instant Pay Gateway</span>
                </div>
                <div>Thank you for your business!</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
