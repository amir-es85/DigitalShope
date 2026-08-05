import Link from "next/link";
import { Session } from "next-auth";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  UserPen,
  ImagePlus,
  LayoutDashboard,
} from "lucide-react";
import LogoutButton from './LogoutButton';
import EditProfileButton from './EditProfileButton';
import { User } from "@/types";
import ChangePhotoDialog from './ChangePhotoDialog';
import ChangePhotoButton from './ChangePhotoButton';

type Props = {
  session: Session,
  onEditName: () => void;
  onEditImage: ()=>void
  user: User | null
};

export default function UserActions({ session,onEditName,user,onEditImage }: Props) {
  return (
    <>
      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <EditProfileButton onClick={onEditName} />
      </DropdownMenuItem>

      <DropdownMenuItem>
       <ChangePhotoButton onClick={onEditImage}/>
      </DropdownMenuItem>

      {session.user.role === "ADMIN" && (
        <>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            
            <Link href="/dashboard/products">
            <LayoutDashboard className=" h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </>
      )}

      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuItem>
    </>
  );
}