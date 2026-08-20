'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateImageAction } from '@/modules/user/action/update-image.action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChangePhotoDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  async function submit(formData: FormData) {
    const result = await updateImageAction(formData);

if (result.success) {
  toast.success(result.message);
  router.refresh();
  onOpenChange(false);
} else {
  toast.error(result.message);
}
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
        </DialogHeader>

        <form action={submit} className="space-y-4">
          <Input type="file" accept="image/*" name="image" />

          <Button type="submit" className="w-full">
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
