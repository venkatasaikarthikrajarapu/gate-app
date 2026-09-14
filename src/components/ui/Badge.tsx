import { clsx } from 'clsx';

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700 text-slate-300 border-slate-600',
  secondary: 'bg-slate-800 text-slate-300 border-slate-700',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  error: 'bg-red-500/15 text-red-400 border-red-500/25',
  info: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
};

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  secondary: 'bg-slate-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-indigo-400',
  purple: 'bg-purple-400',
};

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        badgeClasses[variant],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', dotClasses[variant])} />}
      {children}
    </span>
  );
}
export default Badge;
