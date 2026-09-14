'use client';

import { Flame, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  streak?: number;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, streak, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-4 md:px-6 py-3.5 flex items-center justify-between">
      <div>
        <h1 className="text-base md:text-lg font-semibold text-slate-100 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 hidden md:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Streak badge */}
        {streak !== undefined && streak > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/25 text-amber-400 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Flame size={14} className="text-amber-400" />
            <span>{streak}</span>
          </div>
        )}

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          G
        </div>

        {action && <div>{action}</div>}
      </div>
    </header>
  );
}
export default Header;
