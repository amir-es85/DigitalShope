"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useCart = () => {
    const queryClient = useQueryClient()
    const { data: cart, error, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await fetch('/api/cart')
            if (!res.ok) throw new Error("field fetch")
            return res.json()
        },
        staleTime: Infinity,        // دیتا همیشه fresh
  gcTime: Infinity,           // کش هیچ‌وقت پاک نشه
  refetchOnWindowFocus: false
        

    })

    const addtocart = useMutation({
        mutationFn: async (productid: string) => {
            const res = await fetch("/api/cart", {
                method: 'POST',
                body: JSON.stringify({ productid }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("field add to cart")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: () => {
            alert("fff")
        }
    })
    const removecart = useMutation({
        mutationFn: async (productid: string) => {
            const res = await fetch("/api/cart", {
                method: 'DELETE',
                body: JSON.stringify({ productid }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("field remove")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: () => {
            alert("ggg")
        }
    })
    return { cart, isLoading, error, addtocart, removecart }
}