"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartWithProduct } from "@/types";

function DropDown() {
  const {
    removecart,
    updateQuantity,
    cart,
    isLoading,
  } = useCart();

  const totalPrice =
  cart?.reduce(
    (total:number, item:CartWithProduct) => total + item.product.price * item.quantity,
    0
  ) ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart />

          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cart.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4">
        <h4 className="mb-4 text-lg font-semibold">
          Cart Items
        </h4>

        {isLoading ? (
          <p className="text-sm text-gray-500">
            Loading...
          </p>
        ) : !cart || cart.length === 0 ? (
          <p className="text-sm text-gray-500">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item: CartWithProduct) => (
              <div
                key={item.product.id}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="mb-3">
                  <p className="text-sm font-medium">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    ${item.product.price?.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={
                        item.quantity <= 1 ||
                        updateQuantity.isPending
                      }
                      onClick={() =>
                        updateQuantity.mutate({
                          productid: item.product.id,
                          action: "decrease",
                        })
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={updateQuantity.isPending}
                      onClick={() =>
                        updateQuantity.mutate({
                          productid: item.product.id,
                          action: "increase",
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    disabled={removecart.isPending}
                    onClick={() =>
                      removecart.mutate(item.product.id)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

        )}

        <div className="mt-4 border-t pt-4">
  <div className="flex items-center justify-between">
    <span className="font-medium">Total</span>

    <span className="text-lg font-bold">
      ${totalPrice.toFixed(2)}
    </span>
  </div>
</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;