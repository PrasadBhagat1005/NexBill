import React, { useState, useMemo } from 'react';
import { 
  FileText, PlusCircle, Search, Filter, Calendar, 
  DollarSign, CheckCircle2, Clock, AlertCircle, X, Download
} from 'lucide-react';
import InvoiceTable from './InvoiceTable';
import { calculateInvoiceTotal, formatCurrency } from '../../utils/storage';

export default function AllInvoicesView({ 
  invoices, 
  globalSearch = '',
  onOpenCreateModal, 
  onViewInvoice, 
  onEditInvoice, 
  onDuplicateInvoice, 
  onMarkPaid, 
  onDownloadPDF, 
  onPrintInvoice, 
  onDeleteInvoice 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredInvoices = useMemo(() => {
    let list = invoices.filter(inv => {
      // Header search is shared with the dashboard overview.
      if (globalSearch.trim()) {
        const q = globalSearch.toLowerCase().trim();
        const matchId = inv.id?.toLowerCase().includes(q);
        const matchClient = inv.clientName?.toLowerCase().includes(q) || inv.clientEmail?.toLowerCase().includes(q);
        const matchStatus = inv.status?.toLowerCase().includes(q);
        const matchItem = inv.items?.some(item => item.description?.toLowerCase().includes(q));
        if (!matchId && !matchClient && !matchStatus && !matchItem) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = inv.id?.toLowerCase().includes(q);
        const matchClient = inv.clientName?.toLowerCase().includes(q) || inv.clientEmail?.toLowerCase().includes(q);
        const matchItem = inv.items?.some(i => i.description?.toLowerCase().includes(q));
        if (!matchId && !matchClient && !matchItem) return false;
      }

      // Status
      if (statusFilter !== 'All') {
        if ((inv.status || 'Draft').toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return calculateInvoiceTotal(b) - calculateInvoiceTotal(a);
      if (sortBy === 'amount-asc') return calculateInvoiceTotal(a) - calculateInvoiceTotal(b);
      return 0;
    });

    return list;
  }, [invoices, globalSearch, searchQuery, statusFilter, sortBy]);

  return (
    <div className="view-container">
      <div className="view-header-row">
        <div>
          <h2 className="view-title">All Invoices</h2>
          <p className="view-subtitle">Full invoice archive and status management.</p>
        </div>
        <button onClick={onOpenCreateModal} className="btn btn-emerald-primary btn-lg shadow-emerald">
          <PlusCircle size={20} />
          <span>+ Create Invoice</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="table-controls-card" style={{ marginBottom: '1.5rem' }}>
        <div className="filters-grid">
          <div className="filter-field">
            <label>Search Invoices</label>
            <div className="filter-input-wrapper">
              <Search size={16} className="filter-icon" />
              <input 
                type="text" 
                placeholder="Search by ID, client, or item..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          <div className="filter-field">
            <label>Status</label>
            <select 
              className="filter-select font-semibold"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="filter-field">
            <label>Sort By</label>
            <select 
              className="filter-select font-semibold"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <InvoiceTable 
        invoices={filteredInvoices}
        onView={onViewInvoice}
        onEdit={onEditInvoice}
        onDuplicate={onDuplicateInvoice}
        onMarkPaid={onMarkPaid}
        onDownloadPDF={onDownloadPDF}
        onPrint={onPrintInvoice}
        onDelete={onDeleteInvoice}
        onOpenCreateModal={onOpenCreateModal}
      />
    </div>
  );
}
