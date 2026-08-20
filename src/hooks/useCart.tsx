'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartWithProduct } from '@/types';
import { toast } from 'react-toastify';

export const useCart = () => {
  const queryClient = useQueryClient();

  const {
    data: cart,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],

    queryFn: async () => {
      const res = await fetch('/api/cart');

      if (!res.ok) {
        throw new Error('Failed to fetch cart');
      }

      return res.json();
    },

    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // =========================
  // ADD TO CART
  // =========================

  const addtocart = useMutation({
    mutationFn: async (productid: string) => {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.message ||
            error.error ||
            'Failed to add product to cart'
        );
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success('Product added to cart');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = useMutation({
    mutationFn: async ({
      productid,
      action,
    }: {
      productid: string;
      action: 'increase' | 'decrease';
    }) => {
      const res = await fetch('/api/cart', {
        method: 'PATCH',
        body: JSON.stringify({
          productid,
          action,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.message ||
            error.error ||
            'Failed to update quantity'
        );
      }

      return res.json();
    },

    onMutate: ({ productid, action }) => {
      queryClient.setQueryData<CartWithProduct[]>(
        ['cart'],
        (cart) =>
          cart?.map((item) =>
            item.product.id === productid
              ? {
                  ...item,
                  quantity:
                    action === 'increase'
                      ? item.quantity + 1
                      : item.quantity - 1,
                }
              : item
          )
      );
    },

    // بدون Toast
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },

    // بدون Toast
    onError: (error) => {
      console.error('UPDATE QUANTITY ERROR:', error);
    },
  });

  // =========================
  // REMOVE FROM CART
  // =========================

  const removecart = useMutation({
    mutationFn: async (productid: string) => {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.message ||
            error.error ||
            'Failed to remove product from cart'
        );
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success('Product removed from cart');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    cart,
    isLoading,
    error,
    addtocart,
    removecart,
    updateQuantity,
  };
};