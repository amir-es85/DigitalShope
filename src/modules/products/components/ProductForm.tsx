'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Product, ProductWithImages } from '@/types';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { ubsertProduct } from '../services';
import UploadeImage from './UploadeImage';
import { Category } from '@/generated/client';

type FormProduct = Omit<Product, 'id'>;

function ProductForm(prop: { product: ProductWithImages | null }) {
  const { product } = prop;
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormProduct>();
  const onsubmit = (data: FormProduct) => {
    const parsedPrice = parseFloat(data.price?.toString() || '0');
    const parsedQuantity = parseInt(data.quantity?.toString() || '0');
    const category = data?.category || product?.category;

    const _product = {
      id: product?.id,
      ...data,
      price: parsedPrice,
      quantity: parsedQuantity,
      category: category,
    };
    ubsertProduct(_product);
  };
  return (
    <Card className="max-w-lg mx-auto">
      <form className="" onSubmit={handleSubmit(onsubmit)}>
        <CardHeader>
          <CardTitle className="font-bold text-xl">Product</CardTitle>
          <CardDescription>Create New Products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2.5 mt-2.5">
            <Label className="mb-1">Product Name</Label>
            <Input
              defaultValue={product?.name || ''}
              {...register('name', { required: 'name is requred' })}
              className="h-8"
            />
            {errors.name && <p className="text-red-500 pt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-2.5">
            <Label className="mb-1"> Category</Label>
            <Controller
              name="category"
              control={control}
              defaultValue={product?.category || Category.Tablet}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Select Category" className="h-8" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Category).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="mb-2.5">
            <Label className="mb-1"> Description</Label>
            <Textarea
              defaultValue={product?.description || ''}
              {...register('description', { required: 'Description is required' })}
              className="h-8"
            />
            {errors.description && (
              <p className="text-red-500 pt-1">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-2.5">
            <Label className="mb-1"> Price</Label>
            <Input defaultValue={product?.price || ''} {...register('price')} className="h-8" />
          </div>
          <div className="mb-2.5">
            <Label className="mb-1"> Quantity</Label>
            <Input
              defaultValue={product?.quantity || ''}
              {...register('quantity')}
              className="h-8"
            />
          </div>
          <CardFooter className="flex justify-between mt-2">
            <Button variant="outline" asChild>
              <Link href="/dashbord/products">Back</Link>
            </Button>
            <Button type="submit">{product?.id ? 'Update Product' : 'Create Product'}</Button>
          </CardFooter>
          {product?.id && (
            <CardFooter className="mt-6">
              <UploadeImage id={product.id} />
            </CardFooter>
          )}
        </CardContent>
      </form>
    </Card>
  );
}

export default ProductForm;
