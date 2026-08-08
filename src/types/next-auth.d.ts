import { Role } from '@/generated/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: Role; // یا Role | null
    image?: string | null;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
  }
}
