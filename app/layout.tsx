'use client';

import './globals.css';
import { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-gray-50">{children}</body>
    </html>
  );
}
