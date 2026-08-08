export const uplodimage = async (formdata: FormData) => {
  const res = await fetch('/api/image', {
    method: 'POST',
    body: formdata,
  });
  const data = await res.json();
  if (data) return data;
};

export const fetchproductimages = async (id: string) => {
  const res = await fetch(`/api/image?productid=${id}`);
  const data = await res.json();
  if (data) return data;
};

export const deletedimage = async (imageid: string) => {
  const res = await fetch(`/api/image?imageid=${imageid}`, {
    method: 'DELETE',
  });
};
