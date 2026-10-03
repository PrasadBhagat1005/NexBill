import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Plus, User, Menu, Settings, 
  LogOut, Sparkles, ChevronDown, CheckCircle2 
} from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header({ 
  onToggleSidebar, 
  onOpenCreateModal, 
  globalSearch, 
  setGlobalSearch, 
  user, 
  onLogout,
  notifications,
  onMarkAllRead,
  onNavigateTab
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        {/* Search Bar */}
        <div className="header-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search invoices by #, client name, status..." 
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="header-search-input"
          />
          {globalSearch && (
            <button className="clear-search-btn" onClick={() => setGlobalSearch('')}>
              ×
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* + Create Invoice Header Action */}
        <button onClick={onOpenCreateModal} className="btn btn-emerald-primary">
          <Plus size={18} />
          <span>+ Create Invoice</span>
        </button>

        {/* Notifications Icon Button */}
        <div className="dropdown-wrapper">
          <button 
            className="icon-btn" 
            onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            title="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge-dot">{unreadCount}</span>}
          </button>

          <NotificationsDropdown 
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
          />
        </div>

        {/* User Profile Menu */}
        <div className="dropdown-wrapper">
          <button 
            className="header-user-btn" 
            onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
          >
            <div className="header-avatar">
              {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="header-user-details">
              <span className="header-user-name">{user?.name || 'Alex Morgan'}</span>
              <span className="header-user-role">Business Admin</span>
            </div>
            <ChevronDown size={16} className="chevron-icon" />
          </button>

          {showUserMenu && (
            <div className="user-dropdown-menu animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="menu-header">
                <div className="menu-user-name">{user?.name || 'Alex Morgan'}</div>
                <div className="menu-user-email">{user?.email || 'alex@nexbill.io'}</div>
              </div>
              <div className="menu-divider" />
              <button onClick={() => { setShowUserMenu(false); onNavigateTab('profile'); }} className="menu-item-btn">
                <User size={16} />
                <span>Business Profile</span>
              </button>
              <button onClick={() => { setShowUserMenu(false); onNavigateTab('settings'); }} className="menu-item-btn">
                <Settings size={16} />
                <span>Account Settings</span>
              </button>
              <div className="menu-divider" />
              <button onClick={() => { setShowUserMenu(false); onLogout(); }} className="menu-item-btn text-rose-600">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
