import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { TImage } from '@/types';
import { deletedimage, fetchproductimages, uplodimage } from '../services/image';

function UploadeImage({ id }: { id: string }) {
  const [file, setfile] = useState<File | null>(null);
  const [images, setimages] = useState<TImage[]>([]);
  const handelchanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedfile = e.target.files[0];
    setfile(selectedfile);
  };
  const uploadedImagea = async () => {
    if (!id || !file) return;
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('id', id);
    uplodimage(formdata);
  };

  useEffect(() => {
    async function loadImages() {
      const data = await fetchproductimages(id);
      setimages(data);
    }

    loadImages();
  }, [id]);
  const synicui = (id: string) => {
    setimages((pre) => pre.filter((e) => e.id !== id));
  };

  const handeldeletedimage = async (imageid: string) => {
    await deletedimage(imageid);
    synicui(imageid);
  };

  return (
    <div className="w-full">
      <Label className="mb-3">Product Image</Label>
      <div className="flex gap-2 w-full justify-between">
        <Input type="file" accept="image/*" onChange={handelchanges} />
        <Button onClick={uploadedImagea} size="sm">
          Upload Image
        </Button>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
        {images?.map((item) => (
          <div className="relative group " key={item.id}>
            <button onClick={() => handeldeletedimage(item.id)}>
              <CircleX className="absolute top-4 text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
            </button>

            <Image
              width={100}
              height={100}
              src={item.image}
              alt="Product Image"
              className="mt-4 rounded-md mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadeImage;
