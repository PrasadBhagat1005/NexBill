import React, { useState } from 'react';
import { Users, UserPlus, Mail, Phone, MapPin, FileText, Search, Trash2, Edit3 } from 'lucide-react';
import { calculateInvoiceTotal, formatCurrency } from '../../utils/storage';

export default function ClientsView({ clients, invoices, onOpenAddClientModal, onDeleteClient }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="view-container">
      <div className="view-header-row">
        <div>
          <h2 className="view-title">Client Directory</h2>
          <p className="view-subtitle">Manage client profiles, contacts, and total historical billing.</p>
        </div>
        <button onClick={onOpenAddClientModal} className="btn btn-emerald-primary btn-lg">
          <UserPlus size={18} />
          <span>+ Add New Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="table-controls-card" style={{ marginBottom: '1.5rem' }}>
        <div className="filter-input-wrapper">
          <Search size={18} className="filter-icon" />
          <input 
            type="text" 
            placeholder="Search clients by name, email or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="empty-state-card">
          <Users size={48} className="text-emerald-500" />
          <h3 className="empty-state-title">No clients found</h3>
          <p className="empty-state-description">Add clients to automatically autofill invoice billing data.</p>
          <button onClick={onOpenAddClientModal} className="btn btn-emerald-primary">
            + Add Client
          </button>
        </div>
      ) : (
        <div className="clients-grid">
          {filteredClients.map((client) => {
            const clientInvoices = invoices.filter(i => 
              i.clientName?.toLowerCase() === client.name?.toLowerCase() ||
              i.clientEmail?.toLowerCase() === client.email?.toLowerCase()
            );
            const totalBilled = clientInvoices.reduce((sum, inv) => sum + calculateInvoiceTotal(inv), 0);

            return (
              <div key={client.id} className="client-card shadow-sm-hover">
                <div className="client-card-header">
                  <div className="client-avatar-large">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="client-main-info">
                    <h4 className="client-card-name">{client.name}</h4>
                    <span className="client-card-company">{client.company || 'Independent Client'}</span>
                  </div>
                  {onDeleteClient && (
                    <button 
                      onClick={() => onDeleteClient(client.id)}
                      className="icon-btn-danger"
                      title="Delete Client"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="client-card-body">
                  <div className="client-contact-row">
                    <Mail size={15} className="text-emerald-600" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="client-contact-row">
                      <Phone size={15} className="text-emerald-600" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="client-contact-row">
                      <MapPin size={15} className="text-emerald-600" />
                      <span>{client.address}</span>
                    </div>
                  )}
                </div>

                <div className="client-card-footer">
                  <div className="client-stat">
                    <span className="stat-label">Invoices</span>
                    <span className="stat-value">{clientInvoices.length}</span>
                  </div>
                  <div className="client-stat text-right">
                    <span className="stat-label">Total Billed</span>
                    <span className="stat-value text-emerald-700">{formatCurrency(totalBilled)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
