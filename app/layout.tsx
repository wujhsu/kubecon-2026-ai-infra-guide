import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Infra Field Guide · KubeCon China 2026',
  description: '面向初学者的 KubeCon China 2026 AI Infra 离线预习站',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
