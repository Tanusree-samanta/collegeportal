import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CandidateNotification } from '../../types';

interface CandidateNotificationsViewProps {
  notifications: CandidateNotification[];
  onMarkAllAsRead: () => void;
  onSelectNotificationAction: (target: string) => void;
}

export const CandidateNotificationsView: React.FC<CandidateNotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onSelectNotificationAction,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all');

  const filteredNotifs = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'actionable') return Boolean(notif.actionLabel);
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="w-5 h-5 text-[#0057B8]" />;
      case 'loi':
        return <Award className="w-5 h-5 text-[#0057B8]" />;
      case 'document':
        return <ShieldCheck className="w-5 h-5 text-[#059669]" />;
      default:
        return <FileText className="w-5 h-5 text-[#0057B8]" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. HEADER & CONTROLS                                     */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-[#0057B8]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
              University Secretariat Notices
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
            Notifications & Official Alerts
          </h1>
          <p className="text-xs text-[#52708A] mt-0.5">
            Real-time dispatches from the Selection Committee, Registrar Office, and Academic Scrutiny Cell.
          </p>
        </div>

        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0F7FF] hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-bold transition-all border border-[#D9E2EC] cursor-pointer self-start sm:self-auto"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTER PILLS                                          */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all', label: `All Notices (${notifications.length})` },
          { id: 'unread', label: `Unread (${notifications.filter((n) => !n.read).length})` },
          { id: 'actionable', label: 'Action Required' },
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setFilter(btn.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === btn.id
                ? 'bg-[#0057B8] text-white shadow-xs'
                : 'bg-white text-[#52708A] hover:text-[#003B68] border border-[#D9E2EC]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. NOTIFICATIONS FEED                                    */}
      {/* ========================================================= */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-[#D9E2EC]'
                  : 'bg-[#F0F7FF] border-[#BFDDF5] shadow-xs ring-1 ring-[#BFDDF5]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    notif.read
                      ? 'bg-[#F7F9FC] border-[#D9E2EC]'
                      : 'bg-white border-[#BFDDF5]'
                  }`}
                >
                  {getIcon(notif.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8]">
                      {notif.type}
                    </span>
                    <span className="text-[11px] text-[#71869A] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.timestamp}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#0057B8] animate-pulse" />
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#003B68] leading-snug">
                    {notif.title}
                  </h3>
                  <p className="text-xs text-[#52708A] mt-1 leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                </div>
              </div>

              {notif.actionLabel && notif.actionTarget && (
                <button
                  type="button"
                  onClick={() => onSelectNotificationAction(notif.actionTarget!)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs self-start sm:self-auto shrink-0 cursor-pointer"
                >
                  <span>{notif.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="p-10 rounded-2xl bg-white border border-[#D9E2EC] text-center text-xs text-[#71869A]">
            No notifications found under this filter.
          </div>
        )}
      </div>
    </div>
  );
};
