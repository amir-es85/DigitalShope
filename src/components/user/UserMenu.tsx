
"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserInfo from './UserInfo';
import UserActions from './UserActions';
import EditNameDialog from "./EditNameDialog";
import { User } from "@/types";
import ChangePhotoDialog from './ChangePhotoDialog';

type Props = {
  session: Session | null;
  user: User | null
};

function UserMenu({ session,user }: Props) {
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  if(!session) {
    return(
        <Button asChild variant="default">
  <Link href="/auth">
    Login
  </Link>
</Button>
    )
  }
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>
            <UserIcon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-70 p-4 pt-7 ">
        <UserInfo session={session} user={user}/>
        <UserActions session={session} onEditName={() => setOpenEditName(true)} onEditImage={()=>setOpenEditImage(true)} user={user}/>
      </DropdownMenuContent>
    </DropdownMenu>
    <EditNameDialog
    session={session}
      open={openEditName}
      onOpenChange={setOpenEditName}
      user={user}
    />
    <ChangePhotoDialog open={openEditImage} onOpenChange={setOpenEditImage}/>
    </>
  );
}

export default UserMenu