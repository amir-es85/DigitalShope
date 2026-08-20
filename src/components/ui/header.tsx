import { MonitorSmartphone, ShoppingCart } from 'lucide-react';

import DropDown from '../Cart';
import { auth } from '../../../auth';
import UserMenu from './../user/UserMenu';
import { prisma } from '@/lib/prisma';
import ThemeToggle from './ThemeToggle';

async function Header() {
  const session = await auth();
  const user = session?.user.id
    ? await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })
    : null;
  return (
    <div className="bg-background shadow-md py-4 md:py-5 px-4 md:px-10 flex justify-between items-center fixed top-0 left-0 w-full z-9999">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MonitorSmartphone size={25} />

          <h2 className="font-bold text-xl">Digital Shope</h2>
        </div>

        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4">
        <DropDown />
        <UserMenu session={session} user={user} />
      </div>
    </div>
  );
}

export default Header;
