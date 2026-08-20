import { toast } from 'react-toastify';

export const uplodimage = async (formdata: FormData) => {
  try {
    const res = await fetch('/api/image', {
      method: 'POST',
      body: formdata,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to upload image');
    }

    toast.success('Image uploaded successfully');

    return data;
  } catch (error) {
    console.error('UPLOAD IMAGE ERROR:', error);

    toast.error(error instanceof Error ? error.message : 'Failed to upload image');

    throw error;
  }
};

export const fetchproductimages = async (id: string) => {
  try {
    const res = await fetch(`/api/image?productid=${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to fetch images');
    }

    return data.data;
  } catch (error) {
    console.error('FETCH IMAGES ERROR:', error);

    throw error;
  }
};

export const deletedimage = async (imageid: string) => {
  try {
    const res = await fetch(`/api/image?imageid=${imageid}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || 'Failed to delete image');
    }

    toast.success('Image deleted successfully');

    return data;
  } catch (error) {
    console.error('DELETE IMAGE ERROR:', error);

    toast.error(error instanceof Error ? error.message : 'Failed to delete image');

    throw error;
  }
};
