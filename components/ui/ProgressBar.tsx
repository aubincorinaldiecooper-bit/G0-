'use client';

type ProgressBarProps = {
  value: number;
  color?: string;
  label?: string;
  showPercent?: boolean;
};

export default function ProgressBar({
  value,
  color = '#22c55e',
  label,
  showPercent = false,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
          <span>{label}</span>
          {showPercent && <span>{clampedValue}%</span>}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-gray-800">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${clampedValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
