import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'Cognitive Jelly / 认知水母',
  description: '把愿望、失败、灵感和经验养成可复用智能能力的认知操作系统。'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
