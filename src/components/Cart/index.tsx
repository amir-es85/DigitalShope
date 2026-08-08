'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartWithProduct } from '@/types';

function DropDown() {
  const { removecart, cart, isLoading } = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70 p-4">
        <h4 className="text-lg font-semibold mb-2">Cart Items</h4>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : !cart || cart?.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart?.map((item: CartWithProduct) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Price: ${item.product.price?.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removecart.mutate(item.product.id)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
