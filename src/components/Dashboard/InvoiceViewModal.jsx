import React from 'react';
import { 
  X, Printer, Download, CheckCircle2, Edit3, 
  FileText, Building2, ShieldCheck, Mail, MapPin, Calendar 
} from 'lucide-react';
import { calculateInvoiceTotal, formatCurrency } from '../../utils/storage';

export default function InvoiceViewModal({ 
  isOpen, 
  onClose, 
  invoice, 
  onPrint, 
  onDownloadPDF, 
  onMarkPaid, 
  onEdit,
  profile 
}) {
  if (!isOpen || !invoice) return null;

  const grandTotal = calculateInvoiceTotal(invoice);
  const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const discountAmount = subtotal * ((invoice.discount || 0) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount * ((invoice.taxRate || 0) / 100);

  const getStatusBadgeClass = (status) => {
    const s = (status || 'Draft').toLowerCase();
    switch (s) {
      case 'paid': return 'status-pill status-paid';
      case 'unpaid': return 'status-pill status-unpaid';
      case 'overdue': return 'status-pill status-overdue';
      default: return 'status-pill status-draft';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content invoice-view-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Action Toolbar */}
        <div className="view-modal-toolbar">
          <div className="toolbar-left">
            <span className="font-mono font-bold text-slate-800" style={{ fontSize: '1.1rem' }}>
              {invoice.id}
            </span>
            <span className={getStatusBadgeClass(invoice.status)}>
              ● {invoice.status.toUpperCase()}
            </span>
          </div>

          <div className="toolbar-actions">
            {invoice.status !== 'Paid' && (
              <button 
                onClick={() => { onMarkPaid(invoice.id); }} 
                className="btn btn-sm btn-emerald-primary"
              >
                <CheckCircle2 size={15} /> Mark as Paid
              </button>
            )}
            <button onClick={() => onEdit(invoice)} className="btn btn-sm btn-secondary">
              <Edit3 size={15} /> Edit
            </button>
            <button onClick={() => onDownloadPDF(invoice)} className="btn btn-sm btn-secondary">
              <Download size={15} /> Download PDF
            </button>
            <button onClick={() => onPrint(invoice)} className="btn btn-sm btn-secondary">
              <Printer size={15} /> Print
            </button>
            <button className="modal-close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div className="paper-invoice-sheet" id="printable-paper-view">
          {/* Header */}
          <div className="paper-header">
            <div className="paper-brand">
              <div className="paper-logo-box">
                <FileText size={28} />
              </div>
              <div>
                <h2 className="paper-company-title">
                  {profile?.companyName || 'NexBill Enterprise Inc.'}
                </h2>
                <p className="paper-company-subtitle">
                  {profile?.address || '750 Emerald Green Way, Suite 400, San Francisco, CA'}
                </p>
                <p className="paper-company-subtitle">
                  {profile?.email || 'billing@nexbill.io'} | {profile?.phone || '+1 (800) 555-NEXB'}
                </p>
              </div>
            </div>

            <div className="paper-invoice-meta">
              <h1 className="paper-title-tag">INVOICE</h1>
              <div className="paper-inv-id">{invoice.id}</div>
              <div className="paper-date-row">
                <span>Date:</span> <strong>{invoice.date}</strong>
              </div>
              <div className="paper-date-row">
                <span>Due Date:</span> <strong className="text-emerald-700">{invoice.dueDate}</strong>
              </div>
            </div>
          </div>

          <div className="paper-divider" />

          {/* Bill To & From Grid */}
          <div className="paper-billing-grid">
            <div className="billing-box">
              <div className="billing-label">Billed To</div>
              <div className="billing-name">{invoice.clientName}</div>
              {invoice.clientEmail && <div className="billing-detail">{invoice.clientEmail}</div>}
              {invoice.clientAddress && <div className="billing-detail">{invoice.clientAddress}</div>}
            </div>

            <div className="billing-box text-right">
              <div className="billing-label">Tax ID / Business ID</div>
              <div className="billing-detail font-mono">{profile?.taxId || 'US-987654321'}</div>
              <div className="billing-label" style={{ marginTop: '0.75rem' }}>Payment Status</div>
              <div>
                <span className={getStatusBadgeClass(invoice.status)}>
                  ● {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="paper-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: 'center', width: '80px' }}>Qty</th>
                <th style={{ textAlign: 'right', width: '120px' }}>Unit Price</th>
                <th style={{ textAlign: 'right', width: '130px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-slate-900">{item.description}</td>
                  <td style={{ textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(item.price, invoice.currency)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>
                    {formatCurrency(item.qty * item.price, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Summary */}
          <div className="paper-totals-wrapper">
            <div className="paper-totals-box">
              <div className="paper-total-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, invoice.currency)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="paper-total-row text-emerald-600">
                  <span>Discount ({invoice.discount}%)</span>
                  <span>-{formatCurrency(discountAmount, invoice.currency)}</span>
                </div>
              )}
              {invoice.taxRate > 0 && (
                <div className="paper-total-row">
                  <span>Tax ({invoice.taxRate}%)</span>
                  <span>+{formatCurrency(taxAmount, invoice.currency)}</span>
                </div>
              )}
              <div className="paper-total-row grand-total-line">
                <span>Amount Due</span>
                <span>{formatCurrency(grandTotal, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Footer */}
          {invoice.notes && (
            <div className="paper-notes-box">
              <div className="notes-heading">Notes & Payment Instructions:</div>
              <p>{invoice.notes}</p>
            </div>
          )}

          <div className="paper-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Verified & Secured by NexBill Invoicing Engine</span>
            </div>
            <div>Thank you for your business!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
