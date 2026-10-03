import React from 'react';
import { Bell, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';

export default function NotificationsDropdown({ isOpen, onClose, notifications, onMarkAllRead }) {
  if (!isOpen) return null;

  return (
    <div className="notifications-dropdown animate-fade-in" onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-header">
        <div className="dropdown-title">
          <Bell size={16} className="text-emerald-600" />
          <span>Notifications</span>
          {notifications.some(n => !n.read) && (
            <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem' }}>
              {notifications.filter(n => !n.read).length} New
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={onMarkAllRead} className="btn-link" style={{ fontSize: '0.75rem', color: '#059669' }}>
            Mark all read
          </button>
          <button onClick={onClose} className="icon-btn-sm" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">No new notifications</div>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className={`notification-item ${!item.read ? 'unread' : ''}`}>
              <div className="notification-icon">
                {item.type === 'paid' && <CheckCircle2 size={16} className="text-emerald-500" />}
                {item.type === 'overdue' && <AlertTriangle size={16} className="text-amber-500" />}
                {item.type === 'created' && <Clock size={16} className="text-emerald-600" />}
              </div>
              <div className="notification-content">
                <p className="notification-text">{item.message}</p>
                <span className="notification-time">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
