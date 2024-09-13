// app/page.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import CheckoutForm from '@/components/CheckoutForm';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAdmin } from '@/context/AdminContext';

export default function Home() {
  const { cartItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Modern E-commerce</h1>
        <div className="flex items-center space-x-4">
          <Cart />
          <AdminLogin />
        </div>
      </header>

      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <ProductList />
          {cartItems.length > 0 && (
            <motion.div
              className="fixed bottom-4 right-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={() => setIsCheckoutOpen(true)}>
                Proceed to Order
              </Button>
            </motion.div>
          )}

          <AnimatePresence>
            {isCheckoutOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-8 rounded-lg w-full max-w-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                >
                  <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}