// components/AdminPanel.tsx

'use client';

import { useAdmin } from '../context/AdminContext';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export default function AdminPanel() {
  const { logout } = useAdmin();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been logged out.',
    });
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <p>Admin functionalities will be implemented here.</p>
    </div>
  );
}