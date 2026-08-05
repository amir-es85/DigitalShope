"use client";

import { UserPen } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type Props = {
  onClick: () => void;
};

export default function EditNameButton({
  onClick,
}: Props) {
  return (
    <DropdownMenuItem onClick={onClick}>
      <UserPen className=" h-4 w-4" />
      Edit Name
    </DropdownMenuItem>
  );
}