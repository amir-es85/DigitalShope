import { RegisterSchemaType } from '@/lib/validations/auth';

export async function registerUser(data: RegisterSchemaType) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    console.log(result.error);
    return;
  }

  return result;
}
