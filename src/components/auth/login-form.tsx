'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/lib/validations/auth';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginAction } from '@/modules/auth/actions/login.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: LoginSchemaType) {
    const result = await loginAction(data);

  if (result.success) {
    toast.success(result.message);
    router.push('/products');
  router.refresh();
    
  } else {
    toast.error(result.message);
  }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input type="email" placeholder="Email" {...register('email')} />

        {formState.errors.email && (
          <p className="mt-1 text-sm text-red-500">{formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <Input type="password" placeholder="Password" {...register('password')} />

        {formState.errors.password && (
          <p className="mt-1 text-sm text-red-500">{formState.errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!formState.isValid || formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
