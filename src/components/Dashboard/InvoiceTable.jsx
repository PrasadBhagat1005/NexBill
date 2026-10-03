import React, { useState, useEffect } from 'react';
import { 
  Eye, Edit3, Copy, CheckCircle2, Download, Printer, 
  Trash2, MoreVertical, FileText, Calendar, DollarSign, AlertCircle 
} from 'lucide-react';
import { formatCurrency, calculateInvoiceTotal } from '../../utils/storage';

export default function InvoiceTable({ 
  invoices, 
  onView, 
  onEdit, 
  onDuplicate, 
  onMarkPaid, 
  onDownloadPDF, 
  onPrint, 
  onDelete,
  onOpenCreateModal
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = () => {
      if (activeMenuId) setActiveMenuId(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeMenuId]);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Draft').toLowerCase();
    switch (s) {
      case 'paid':
        return <span className="status-pill status-paid">● Paid</span>;
      case 'unpaid':
      case 'pending':
        return <span className="status-pill status-unpaid">● Unpaid</span>;
      case 'overdue':
        return <span className="status-pill status-overdue">● Overdue</span>;
      case 'draft':
      default:
        return <span className="status-pill status-draft">● Draft</span>;
    }
  };

  if (!invoices || invoices.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">
          <FileText size={48} className="text-emerald-500" />
        </div>
        <h3 className="empty-state-title">Create your first professional invoice</h3>
        <p className="empty-state-description">
          Generate custom branded invoices, manage client billing, and track revenue seamlessly.
        </p>
        <button onClick={onOpenCreateModal} className="btn btn-emerald-primary btn-lg">
          + Create Invoice
        </button>
      </div>
    );
  }

  return (
    <div className="invoice-table-wrapper">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => {
            const grandTotal = calculateInvoiceTotal(inv);
            const isMenuOpen = activeMenuId === inv.id;

            return (
              <tr key={inv.id} className="table-row-hover">
                <td className="font-mono font-bold text-slate-900">
                  <div className="invoice-id-badge">
                    <FileText size={15} className="text-emerald-600" />
                    <span>{inv.id}</span>
                  </div>
                </td>
                <td>
                  <div className="client-info-cell">
                    <span className="client-name">{inv.clientName}</span>
                    <span className="client-email">{inv.clientEmail}</span>
                  </div>
                </td>
                <td className="text-slate-600 font-medium">
                  {inv.date}
                </td>
                <td className="text-slate-600 font-medium">
                  {inv.dueDate}
                </td>
                <td className="amount-cell">
                  {formatCurrency(grandTotal, inv.currency || '$')}
                </td>
                <td>
                  {getStatusBadge(inv.status)}
                </td>
                <td style={{ textAlign: 'right', position: 'relative' }}>
                  {/* Inline Quick Action Buttons for Large Screens + Dropdown for Full Menu */}
                  <div className="table-actions-group">
                    <button 
                      onClick={() => onView(inv)} 
                      className="action-btn action-btn-view" 
                      title="View Invoice"
                    >
                      <Eye size={16} />
                      <span className="action-btn-label">View</span>
                    </button>

                    <button 
                      onClick={() => onEdit(inv)} 
                      className="action-btn action-btn-edit" 
                      title="Edit Invoice"
                    >
                      <Edit3 size={16} />
                      <span className="action-btn-label">Edit</span>
                    </button>

                    {inv.status !== 'Paid' && (
                      <button 
                        onClick={() => onMarkPaid(inv.id)} 
                        className="action-btn action-btn-paid" 
                        title="Mark as Paid"
                      >
                        <CheckCircle2 size={16} />
                        <span className="action-btn-label">Paid</span>
                      </button>
                    )}

                    <div className="dropdown-container">
                      <button 
                        onClick={(e) => toggleMenu(inv.id, e)} 
                        className="action-btn-more" 
                        title="More Actions"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {isMenuOpen && (
                        <div 
                          className="actions-dropdown-menu animate-fade-in" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button onClick={() => { setActiveMenuId(null); onView(inv); }} className="dropdown-item">
                            <Eye size={15} className="text-emerald-600" /> View
                          </button>
                          <button onClick={() => { setActiveMenuId(null); onEdit(inv); }} className="dropdown-item">
                            <Edit3 size={15} className="text-blue-600" /> Edit
                          </button>
                          <button onClick={() => { setActiveMenuId(null); onDuplicate(inv); }} className="dropdown-item">
                            <Copy size={15} className="text-purple-600" /> Duplicate
                          </button>
                          {inv.status !== 'Paid' && (
                            <button onClick={() => { setActiveMenuId(null); onMarkPaid(inv.id); }} className="dropdown-item text-emerald-600">
                              <CheckCircle2 size={15} /> Mark as Paid
                            </button>
                          )}
                          <button onClick={() => { setActiveMenuId(null); onDownloadPDF(inv); }} className="dropdown-item">
                            <Download size={15} className="text-teal-600" /> Download PDF
                          </button>
                          <button onClick={() => { setActiveMenuId(null); onPrint(inv); }} className="dropdown-item">
                            <Printer size={15} className="text-slate-600" /> Print
                          </button>
                          <div className="dropdown-divider" />
                          <button onClick={() => { setActiveMenuId(null); onDelete(inv.id); }} className="dropdown-item text-rose-600">
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
