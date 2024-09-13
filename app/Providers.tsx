// app/Providers.tsx

'use client';

import { CartProvider } from '../context/CartContext';
import { AdminProvider } from '../context/AdminContext';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <AdminProvider>{children}</AdminProvider>
    </CartProvider>
  );
}