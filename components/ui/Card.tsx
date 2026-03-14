'use client';

import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 backdrop-blur-sm ${className}`.trim()}
    >
      {children}
    </div>
  );
}
