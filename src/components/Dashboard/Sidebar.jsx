import React from 'react';
import { 
  LayoutDashboard, PlusCircle, FileText, Users, 
  Building2, Settings, LogOut, FilePlus, Sparkles, X, ChevronRight 
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onOpenCreateModal, 
  onLogout, 
  user,
  isOpen,
  onCloseMobile
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-invoice', label: 'Create Invoice', icon: PlusCircle, isAction: true },
    { id: 'all-invoices', label: 'All Invoices', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'profile', label: 'Business Profile', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    if (id === 'create-invoice') {
      onOpenCreateModal();
    } else {
      setActiveTab(id);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Overlay for mobile backdrop */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon-emerald">
              <FilePlus size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-name">NexBill</span>
              <span className="brand-badge">PRO</span>
            </div>
          </div>
          {onCloseMobile && (
            <button className="mobile-close-btn" onClick={onCloseMobile} title="Close Menu">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Quick + Create Invoice Button in Sidebar */}
        <div className="sidebar-action-box">
          <button onClick={() => handleNavClick('create-invoice')} className="btn-sidebar-create">
            <PlusCircle size={18} />
            <span>Create Invoice</span>
          </button>
        </div>

        {/* Main Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-group-label">MAIN MENU</div>
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              if (item.isAction) return null; // Action button rendered above

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`sidebar-menu-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={19} className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="active-chevron" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Business Profile Widget at Sidebar Bottom */}
        <div className="sidebar-bottom">
          <div className="sidebar-user-card">
            <div className="user-avatar">
              {(user?.name || user?.email || 'User').charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Alex Morgan'}</span>
              <span className="user-email">{user?.email || 'alex@nexbill.io'}</span>
            </div>
          </div>

          <button onClick={onLogout} className="sidebar-logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
