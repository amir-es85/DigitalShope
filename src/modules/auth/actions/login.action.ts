import { signIn } from 'next-auth/react';
import { LoginSchemaType } from '@/lib/validations/auth';

export async function loginAction(data: LoginSchemaType) {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      console.error('SIGN IN ERROR:', result.error);

      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    return {
      success: true,
      message: 'Logged in successfully',
    };
  } catch (error) {
    console.error('LOGIN ERROR:', error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to login',
    };
  }
}