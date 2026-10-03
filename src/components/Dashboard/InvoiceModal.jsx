import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Save, FileText, Calendar, 
  DollarSign, User, Send, CheckCircle2 
} from 'lucide-react';
import { calculateInvoiceTotal, formatCurrency } from '../../utils/storage';

export default function InvoiceModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialInvoice = null, 
  clients = [] 
}) {
  const [formData, setFormData] = useState({
    id: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    status: 'Unpaid',
    currency: '$',
    items: [
      { id: Date.now(), description: 'Professional Services', qty: 1, price: 500 }
    ],
    taxRate: 10,
    discount: 0,
    notes: 'Thank you for your business!'
  });

  useEffect(() => {
    if (initialInvoice) {
      setFormData(initialInvoice);
    } else {
      // Generate new invoice ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setFormData({
        id: `INV-2026-${randomNum}`,
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: 'Unpaid',
        currency: '$',
        items: [
          { id: Date.now(), description: 'Professional Services', qty: 1, price: 500 }
        ],
        taxRate: 10,
        discount: 0,
        notes: 'Thank you for your business!'
      });
    }
  }, [initialInvoice, isOpen]);

  if (!isOpen) return null;

  const handleClientSelect = (clientId) => {
    const selected = clients.find(c => c.id === clientId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        clientName: selected.name,
        clientEmail: selected.email,
        clientAddress: selected.address || ''
      }));
    }
  };

  const handleItemChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const val = (field === 'qty' || field === 'price') ? parseFloat(value) || 0 : value;
          return { ...item, [field]: val };
        }
        return item;
      })
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: 'New Service Line Item',
      qty: 1,
      price: 150
    };
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const grandTotal = calculateInvoiceTotal(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName) {
      alert('Please enter or select a client name.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content invoice-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <FileText size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="modal-title">
                {initialInvoice ? `Edit Invoice ${initialInvoice.id}` : 'Create New Invoice'}
              </h2>
              <p className="modal-subtitle">Fill in details to generate a professional invoice.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="invoice-form-body">
          {/* Top Row: Invoice ID, Status, Currency */}
          <div className="form-grid-3">
            <div className="form-group">
              <label>Invoice Number</label>
              <input 
                type="text" 
                className="form-input font-mono font-bold" 
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Status</label>
              <select 
                className="form-select font-semibold"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Draft">Draft</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select 
                className="form-select font-semibold"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="₹">₹ INR</option>
                <option value="C$">C$ CAD</option>
              </select>
            </div>
          </div>

          {/* Client Details Section */}
          <div className="form-section-card">
            <div className="section-card-header">
              <User size={16} className="text-emerald-600" />
              <span>Client Information</span>
              {clients.length > 0 && (
                <div style={{ marginLeft: 'auto' }}>
                  <select 
                    className="select-sm"
                    onChange={(e) => handleClientSelect(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>-- Select Saved Client --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.company || c.email})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Client Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Acme SaaS Corp"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Client Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="billing@acme.io"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '0.75rem' }}>
              <label>Client Address</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="100 Silicon Way, San Francisco, CA"
                value={formData.clientAddress}
                onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
              />
            </div>
          </div>

          {/* Dates Row */}
          <div className="form-grid-2">
            <div className="form-group">
              <label>Invoice Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="form-section-card">
            <div className="section-card-header">
              <FileText size={16} className="text-emerald-600" />
              <span>Line Items</span>
            </div>

            <div className="items-table-wrapper">
              <table className="items-edit-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Qty</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Price</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Total</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input 
                          type="text" 
                          className="table-input"
                          placeholder="Service description"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="table-input text-center"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="table-input text-right"
                          step="0.01"
                          min="0"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                          required
                        />
                      </td>
                      <td className="item-total-cell">
                        {formData.currency}{((item.qty || 0) * (item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-center">
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id)} 
                          className="item-delete-btn"
                          disabled={formData.items.length <= 1}
                          title="Delete line item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button 
              type="button" 
              onClick={addItem} 
              className="btn btn-ghost-emerald"
              style={{ marginTop: '0.75rem' }}
            >
              <Plus size={16} /> Add Line Item
            </button>
          </div>

          {/* Tax, Discount, Notes & Total Summary */}
          <div className="form-bottom-summary-grid">
            <div className="form-group">
              <label>Invoice Notes & Payment Instructions</label>
              <textarea 
                rows="3"
                className="form-textarea"
                placeholder="Thank you for your business..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="summary-calculation-card">
              <div className="calc-row">
                <span>Tax Rate (%)</span>
                <input 
                  type="number" 
                  className="calc-input"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="calc-row">
                <span>Discount (%)</span>
                <input 
                  type="number" 
                  className="calc-input"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="calc-row calc-total-row">
                <span>Grand Total:</span>
                <span className="grand-total-amount">
                  {formatCurrency(grandTotal, formData.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Form Modal Buttons */}
          <div className="modal-actions-bar">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald-primary btn-lg">
              <Save size={18} />
              <span>{initialInvoice ? 'Save Changes' : 'Create & Save Invoice'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
