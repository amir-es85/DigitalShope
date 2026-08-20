'use server';

import { auth } from '../../../../auth';
import { updateImageService } from '../services/update-image.service';

export async function updateImageAction(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: 'You must be logged in',
      };
    }

    const image = formData.get('image');

    if (!(image instanceof File)) {
      return {
        success: false,
        message: 'Please select an image',
      };
    }

    await updateImageService(session.user.id, image);

    return {
      success: true,
      message: 'Profile image updated successfully',
    };
  } catch (error) {
    console.error('UPDATE IMAGE ERROR:', error);

    return {
      success: false,
      message: 'Failed to update profile image',
    };
  }
}