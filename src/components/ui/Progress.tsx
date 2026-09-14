import { clsx } from 'clsx';

interface ProgressProps {
  value: number; // 0–100
  max?: number;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
  color?: 'indigo' | 'emerald' | 'amber' | 'red';
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

const heightClasses = { xs: 'h-1', sm: 'h-1.5', md: 'h-2.5' };

const colorClasses = {
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export function Progress({
  value,
  max = 100,
  className,
  size = 'sm',
  color = 'indigo',
  label,
  showValue,
  animated,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const dynamicColor =
    pct >= 80 ? 'emerald' : pct >= 50 ? color : pct >= 30 ? 'amber' : 'red';

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-slate-700/60 rounded-full overflow-hidden', heightClasses[size])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700 ease-out',
            colorClasses[dynamicColor],
            animated && 'animate-pulse'
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
export default Progress;
