import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardOverview from './DashboardOverview';
import AllInvoicesView from './AllInvoicesView';
import ClientsView from './ClientsView';
import BusinessProfileView from './BusinessProfileView';
import SettingsView from './SettingsView';
import InvoiceModal from './InvoiceModal';
import InvoiceViewModal from './InvoiceViewModal';
import AddClientModal from './AddClientModal';
import { 
  getSavedInvoices, saveInvoices, 
  getSavedClients, saveClients, 
  getSavedProfile, saveProfile,
  INITIAL_INVOICES, INITIAL_CLIENTS, INITIAL_PROFILE 
} from '../../utils/storage';

export default function DashboardLayout({ user, onLogout, showToast }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Persistent State
  const [invoices, setInvoices] = useState(getSavedInvoices);
  const [clients, setClients] = useState(getSavedClients);
  const [profile, setProfile] = useState(getSavedProfile);

  // Modals state
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'paid', message: 'Payment received for INV-2026-001 ($4,845.00)', time: '10m ago', read: false },
    { id: 2, type: 'overdue', message: 'Invoice INV-2026-003 is overdue (Vortex Agency)', time: '1h ago', read: false },
    { id: 3, type: 'created', message: 'New invoice INV-2026-005 created for Horizon Media', time: '3h ago', read: true }
  ]);

  // Sync state to localStorage whenever modified
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Invoice Handlers
  const handleOpenCreateModal = () => {
    setEditingInvoice(null);
    setIsInvoiceModalOpen(true);
  };

  const handleOpenEditModal = (inv) => {
    setEditingInvoice(inv);
    setIsInvoiceModalOpen(true);
  };

  const handleSaveInvoice = (invoiceData) => {
    const existingIndex = invoices.findIndex(i => i.id === invoiceData.id);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...invoices];
      updatedList[existingIndex] = invoiceData;
      showToast(`Invoice ${invoiceData.id} updated successfully`, 'success');
    } else {
      updatedList = [invoiceData, ...invoices];
      showToast(`New Invoice ${invoiceData.id} created successfully!`, 'success');
    }
    setInvoices(updatedList);

    // Auto add notification
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'created',
        message: `Invoice ${invoiceData.id} saved for ${invoiceData.clientName}`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const handleDuplicateInvoice = (inv) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `INV-2026-${randomNum}`;
    const duplicate = {
      ...inv,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    setInvoices([duplicate, ...invoices]);
    showToast(`Duplicated ${inv.id} into ${newId}`, 'success');
  };

  const handleMarkPaid = (id) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: 'Paid' };
      }
      return inv;
    }));
    if (viewingInvoice && viewingInvoice.id === id) {
      setViewingInvoice(prev => prev ? { ...prev, status: 'Paid' } : null);
    }
    showToast(`Invoice ${id} marked as Paid!`, 'success');

    // Add notification
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'paid',
        message: `Invoice ${id} marked as Paid`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const handleDownloadPDF = (inv) => {
    showToast(`Downloading PDF for ${inv.id}...`, 'success');
    // Open paper print view modal for download / print
    setViewingInvoice(inv);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handlePrintInvoice = (inv) => {
    setViewingInvoice(inv);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleDeleteInvoice = (id) => {
    if (window.confirm(`Are you sure you want to delete invoice ${id}?`)) {
      setInvoices(prev => prev.filter(i => i.id !== id));
      showToast(`Invoice ${id} deleted`, 'info');
    }
  };

  // Client Handlers
  const handleSaveClient = (newClient) => {
    setClients([newClient, ...clients]);
    showToast(`Client ${newClient.name} added!`, 'success');
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Delete this client?')) {
      setClients(clients.filter(c => c.id !== id));
      showToast('Client deleted', 'info');
    }
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    if (window.confirm('Reset invoices and clients to sample demo data?')) {
      setInvoices(INITIAL_INVOICES);
      setClients(INITIAL_CLIENTS);
      setProfile(INITIAL_PROFILE);
      showToast('Sample demo dataset restored!', 'success');
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Notifications marked as read', 'info');
  };

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={handleOpenCreateModal}
        onLogout={onLogout}
        user={user}
        isOpen={sidebarMobileOpen}
        onCloseMobile={() => setSidebarMobileOpen(false)}
      />

      {/* Main Body */}
      <div className="dashboard-main-area">
        {/* Top Header */}
        <Header 
          onToggleSidebar={() => setSidebarMobileOpen(!sidebarMobileOpen)}
          onOpenCreateModal={handleOpenCreateModal}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          user={user}
          onLogout={onLogout}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onNavigateTab={setActiveTab}
        />

        {/* Content Area */}
        <main className="dashboard-content-wrapper">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              invoices={invoices}
              globalSearch={globalSearch}
              onOpenCreateModal={handleOpenCreateModal}
              onViewInvoice={setViewingInvoice}
              onEditInvoice={handleOpenEditModal}
              onDuplicateInvoice={handleDuplicateInvoice}
              onMarkPaid={handleMarkPaid}
              onDownloadPDF={handleDownloadPDF}
              onPrintInvoice={handlePrintInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              onNavigateTab={setActiveTab}
              onOpenAddClientModal={() => setIsAddClientModalOpen(true)}
            />
          )}

          {activeTab === 'all-invoices' && (
            <AllInvoicesView 
              invoices={invoices}
              globalSearch={globalSearch}
              onOpenCreateModal={handleOpenCreateModal}
              onViewInvoice={setViewingInvoice}
              onEditInvoice={handleOpenEditModal}
              onDuplicateInvoice={handleDuplicateInvoice}
              onMarkPaid={handleMarkPaid}
              onDownloadPDF={handleDownloadPDF}
              onPrintInvoice={handlePrintInvoice}
              onDeleteInvoice={handleDeleteInvoice}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsView 
              clients={clients}
              invoices={invoices}
              onOpenAddClientModal={() => setIsAddClientModalOpen(true)}
              onDeleteClient={handleDeleteClient}
            />
          )}

          {activeTab === 'profile' && (
            <BusinessProfileView 
              profile={profile}
              onSaveProfile={setProfile}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              profile={profile}
              onSaveProfile={setProfile}
              onResetDemoData={handleResetDemoData}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <InvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={handleSaveInvoice}
        initialInvoice={editingInvoice}
        clients={clients}
      />

      <InvoiceViewModal 
        isOpen={!!viewingInvoice}
        onClose={() => setViewingInvoice(null)}
        invoice={viewingInvoice}
        onPrint={handlePrintInvoice}
        onDownloadPDF={handleDownloadPDF}
        onMarkPaid={handleMarkPaid}
        onEdit={(inv) => { setViewingInvoice(null); handleOpenEditModal(inv); }}
        profile={profile}
      />

      <AddClientModal 
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onSaveClient={handleSaveClient}
      />
    </div>
  );
}
