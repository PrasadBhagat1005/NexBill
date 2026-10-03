import React, { useState, useMemo } from 'react';
import { 
  FileText, CheckCircle2, Clock, DollarSign, PlusCircle, 
  Users, Building2, Search, Filter, Calendar, ArrowUpRight, 
  Sparkles, RefreshCw, X
} from 'lucide-react';
import InvoiceTable from './InvoiceTable';
import { calculateInvoiceTotal, formatCurrency } from '../../utils/storage';

export default function DashboardOverview({ 
  invoices = [], 
  globalSearch = '',
  onOpenCreateModal, 
  onViewInvoice, 
  onEditInvoice, 
  onDuplicateInvoice, 
  onMarkPaid, 
  onDownloadPDF, 
  onPrintInvoice, 
  onDeleteInvoice,
  onNavigateTab,
  onOpenAddClientModal
}) {
  // Real-time Filters state
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [amountFilter, setAmountFilter] = useState('All');

  // Calculate Real-Time Dashboard Statistics
  const stats = useMemo(() => {
    const totalCount = invoices.length;
    let paidCount = 0;
    let pendingCount = 0;
    let totalRevenue = 0;

    invoices.forEach(inv => {
      const amount = calculateInvoiceTotal(inv);
      const status = (inv.status || 'Draft').toLowerCase();

      if (status === 'paid') {
        paidCount += 1;
        totalRevenue += amount;
      } else {
        pendingCount += 1;
      }
    });

    return {
      totalCount,
      paidCount,
      pendingCount,
      totalRevenue
    };
  }, [invoices]);

  // Real-Time Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const grandTotal = calculateInvoiceTotal(inv);

      // Header search applies across all invoice views.
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase().trim();
        const matchId = inv.id?.toLowerCase().includes(query);
        const matchClient = inv.clientName?.toLowerCase().includes(query) || inv.clientEmail?.toLowerCase().includes(query);
        const matchStatus = inv.status?.toLowerCase().includes(query);
        const matchItem = inv.items?.some(item => item.description?.toLowerCase().includes(query));
        if (!matchId && !matchClient && !matchStatus && !matchItem) return false;
      }

      // Invoice Search Filter
      if (invoiceSearch.trim()) {
        const query = invoiceSearch.toLowerCase().trim();
        const matchId = inv.id?.toLowerCase().includes(query);
        const matchItem = inv.items?.some(i => i.description?.toLowerCase().includes(query));
        if (!matchId && !matchItem) return false;
      }

      // Client Search Filter
      if (clientSearch.trim()) {
        const query = clientSearch.toLowerCase().trim();
        const matchName = inv.clientName?.toLowerCase().includes(query);
        const matchEmail = inv.clientEmail?.toLowerCase().includes(query);
        if (!matchName && !matchEmail) return false;
      }

      // Status Filter
      if (statusFilter !== 'All') {
        if ((inv.status || 'Draft').toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      // Date Filter
      if (dateFilter !== 'All') {
        const invDate = new Date(inv.date);
        const now = new Date();
        if (dateFilter === 'this-month') {
          if (invDate.getMonth() !== now.getMonth() || invDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        } else if (dateFilter === 'this-year') {
          if (invDate.getFullYear() !== now.getFullYear()) {
            return false;
          }
        }
      }

      // Amount Filter
      if (amountFilter !== 'All') {
        if (amountFilter === 'under-500' && grandTotal >= 500) return false;
        if (amountFilter === '500-2000' && (grandTotal < 500 || grandTotal > 2000)) return false;
        if (amountFilter === 'over-2000' && grandTotal <= 2000) return false;
      }

      return true;
    });
  }, [invoices, globalSearch, invoiceSearch, clientSearch, statusFilter, dateFilter, amountFilter]);

  const clearFilters = () => {
    setInvoiceSearch('');
    setClientSearch('');
    setStatusFilter('All');
    setDateFilter('All');
    setAmountFilter('All');
  };

  const isFiltered = globalSearch || invoiceSearch || clientSearch || statusFilter !== 'All' || dateFilter !== 'All' || amountFilter !== 'All';

  return (
    <div className="dashboard-overview-container">
      
      {/* Welcome Banner */}
      <div className="overview-welcome-card">
        <div>
          <h1 className="welcome-title">
            Financial Dashboard <Sparkles size={20} className="inline-icon text-emerald-500" />
          </h1>
          <p className="welcome-subtitle">
            Manage invoices, client payments, and track live revenue updates in real-time.
          </p>
        </div>
        <button onClick={onOpenCreateModal} className="btn btn-emerald-primary btn-lg shadow-emerald">
          <PlusCircle size={20} />
          <span>+ Create New Invoice</span>
        </button>
      </div>

      {/* 4 Dashboard Summary Cards */}
      <div className="dashboard-cards-grid">
        {/* Total Invoices */}
        <div className="summary-card shadow-sm-hover">
          <div className="card-top-row">
            <span className="card-label">Total Invoices</span>
            <div className="card-icon-box icon-emerald-light">
              <FileText size={22} className="text-emerald-600" />
            </div>
          </div>
          <div className="card-value">{stats.totalCount}</div>
          <div className="card-subtext positive">
            <span>● Dynamic live count</span>
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="summary-card shadow-sm-hover">
          <div className="card-top-row">
            <span className="card-label">Paid Invoices</span>
            <div className="card-icon-box icon-emerald-dark">
              <CheckCircle2 size={22} className="text-emerald-500" />
            </div>
          </div>
          <div className="card-value text-emerald-700">{stats.paidCount}</div>
          <div className="card-subtext positive">
            <span>Settled & processed</span>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="summary-card shadow-sm-hover">
          <div className="card-top-row">
            <span className="card-label">Pending Invoices</span>
            <div className="card-icon-box icon-amber">
              <Clock size={22} className="text-amber-600" />
            </div>
          </div>
          <div className="card-value text-amber-600">{stats.pendingCount}</div>
          <div className="card-subtext warning">
            <span>Unpaid, draft & overdue</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="summary-card shadow-sm-hover highlight-card">
          <div className="card-top-row">
            <span className="card-label font-bold text-white">Total Revenue</span>
            <div className="card-icon-box icon-white">
              <DollarSign size={22} className="text-emerald-700" />
            </div>
          </div>
          <div className="card-value text-white">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div className="card-subtext text-emerald-100">
            <span>Real calculated sum of paid invoices</span>
          </div>
        </div>
      </div>

      {/* Large Quick Action Cards */}
      <div className="quick-actions-section">
        <h3 className="section-block-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          <div 
            onClick={onOpenCreateModal} 
            className="action-card action-card-primary clickable-hover"
          >
            <div className="action-card-icon">
              <PlusCircle size={28} />
            </div>
            <div className="action-card-info">
              <h4>Create New Invoice</h4>
              <p>Issue instant custom invoices with automated totals</p>
            </div>
            <ArrowUpRight size={20} className="action-card-arrow" />
          </div>

          <div 
            onClick={() => onNavigateTab('all-invoices')} 
            className="action-card clickable-hover"
          >
            <div className="action-card-icon icon-teal">
              <FileText size={26} />
            </div>
            <div className="action-card-info">
              <h4>View All Invoices</h4>
              <p>Filter, export, and inspect complete invoice repository</p>
            </div>
            <ArrowUpRight size={20} className="action-card-arrow" />
          </div>

          <div 
            onClick={onOpenAddClientModal} 
            className="action-card clickable-hover"
          >
            <div className="action-card-icon icon-blue">
              <Users size={26} />
            </div>
            <div className="action-card-info">
              <h4>Add Client</h4>
              <p>Register new clients for fast automated billing</p>
            </div>
            <ArrowUpRight size={20} className="action-card-arrow" />
          </div>

          <div 
            onClick={() => onNavigateTab('profile')} 
            className="action-card clickable-hover"
          >
            <div className="action-card-icon icon-slate">
              <Building2 size={26} />
            </div>
            <div className="action-card-info">
              <h4>Business Profile</h4>
              <p>Update company logo, address, and payment terms</p>
            </div>
            <ArrowUpRight size={20} className="action-card-arrow" />
          </div>
        </div>
      </div>

      {/* Modern Filter & Search Controls */}
      <div className="table-controls-card">
        <div className="controls-top-row">
          <div className="controls-heading">
            <h3 className="section-block-title" style={{ margin: 0 }}>Recent Invoices</h3>
            <span className="results-count-badge">
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </span>
          </div>

          {isFiltered && (
            <button onClick={clearFilters} className="btn-link text-rose-600 font-semibold" style={{ fontSize: '0.85rem' }}>
              <X size={14} className="inline-icon" /> Reset Filters
            </button>
          )}
        </div>

        {/* Real-time Search & Filter Grid */}
        <div className="filters-grid">
          {/* Invoice Search */}
          <div className="filter-field">
            <label>Invoice Search</label>
            <div className="filter-input-wrapper">
              <Search size={16} className="filter-icon" />
              <input 
                type="text" 
                placeholder="INV # or description..." 
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Client Search */}
          <div className="filter-field">
            <label>Client Search</label>
            <div className="filter-input-wrapper">
              <Users size={16} className="filter-icon" />
              <input 
                type="text" 
                placeholder="Client name or email..." 
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-field">
            <label>Status Filter</label>
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

          {/* Date Filter */}
          <div className="filter-field">
            <label>Date Filter</label>
            <select 
              className="filter-select font-semibold"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="All">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-year">This Year</option>
            </select>
          </div>

          {/* Amount Filter */}
          <div className="filter-field">
            <label>Amount Filter</label>
            <select 
              className="filter-select font-semibold"
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
            >
              <option value="All">All Amounts</option>
              <option value="under-500">Under $500</option>
              <option value="500-2000">$500 - $2,000</option>
              <option value="over-2000">Over $2,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice Table / Empty State */}
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
