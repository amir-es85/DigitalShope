'use client';

import { ImagePlus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type Props = {
  onClick: () => void;
};

export default function ChangePhotoButton({ onClick }: Props) {
  return (
    <DropdownMenuItem onClick={onClick}>
      <ImagePlus className=" h-4 w-4" />
      Edit Photo
    </DropdownMenuItem>
  );
}
