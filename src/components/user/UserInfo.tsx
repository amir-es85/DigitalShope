import { User } from '@/types';
import { Session } from 'next-auth';

type UserInfoProps = {
  session: Session;
  user: User | null;
};

export default function UserInfo({ session, user }: UserInfoProps) {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold">{user?.name}</h3>

      <p className="text-sm text-muted-foreground">{session.user.email}</p>

      <p className="text-xs uppercase text-muted-foreground">{session.user.role}</p>
    </div>
  );
}
