'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditNameSchemaType } from '@/lib/validations/editname';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditNameSchema } from './../../lib/validations/editname';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { updateNameAction } from '@/modules/user/services/update-name.service';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

type Props = {
  session: Session;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export default function EditNameDialog({ open, onOpenChange, session }: Props) {
  const router = useRouter();
  const form = useForm<EditNameSchemaType>({
    resolver: zodResolver(EditNameSchema),
    defaultValues: {
      name: session.user.name ?? '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: EditNameSchemaType) => {
    try {
      await updateNameAction(data);
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Name</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label className="text-sm font-medium">Name</label>

            <Input className="mt-1" {...form.register('name')} placeholder="Enter your name" />

            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
