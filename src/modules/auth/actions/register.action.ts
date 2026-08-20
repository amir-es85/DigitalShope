import { signIn } from 'next-auth/react';
import { RegisterSchemaType } from '@/lib/validations/auth';
import { registerUser } from '../services/auth.service';

export async function registerAction(data: RegisterSchemaType) {
  try {
    await registerUser(data);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: 'Account created, but login failed',
      };
    }

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to create account',
    };
  }
}