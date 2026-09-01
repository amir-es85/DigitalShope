'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={() => signOut({ callbackUrl: 'https://digitalshope.onrender.com/auth' })}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </DropdownMenuItem>
  );
}
