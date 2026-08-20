'use server';

import { EditNameSchemaType } from '@/lib/validations/editname';
import { updateNameService } from '../action/update-name.action';
import { auth } from '../../../../auth';

export async function updateNameAction(data: EditNameSchemaType) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: 'You must be logged in',
      };
    }

    await updateNameService(session.user.id, data.name);

    return {
      success: true,
      message: 'Name updated successfully',
    };
  } catch (error) {
    console.error('UPDATE NAME ERROR:', error);

    return {
      success: false,
      message: 'Failed to update name',
    };
  }
}