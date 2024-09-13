// components/CheckoutForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useCart } from '../context/CartContext';
import { useToast } from "@/components/ui/use-toast";

type CheckoutFormProps = {
  onClose: () => void;
};

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
});

export default function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { cartItems, clearCart } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    console.log('Order placed:', { ...data, items: cartItems });
    // Implement order submission logic here
    toast({
      title: 'Order Placed',
      description: 'Your order has been successfully placed!',
    });
    clearCart();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="company">Company Name (optional)</Label>
        <Input id="company" {...register('company')} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Place Order</Button>
      </div>
    </form>
  );
}