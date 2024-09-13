// app/layout.tsx

import './globals.css'; // Import global CSS
import type { Metadata } from 'next';
import Providers from './Providers'; // Import the Providers component
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Modern E-commerce',
  description: 'A modern e-commerce application',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}