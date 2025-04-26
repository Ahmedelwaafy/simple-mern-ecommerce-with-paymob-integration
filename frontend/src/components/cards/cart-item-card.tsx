"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormatCurrency from "@/lib/format-currency";
import { CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { t } = useTranslation("Checkout");

  return (
    <div className="flex items-start border-b pb-4 py-4 gap-3">
      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-xs font-thin opacity-80  line-clamp-2">{item.product.description}</p>
        <p className="text-sm font-semibold mt-1">
          {FormatCurrency(item.itemTotalPrice)}
        </p>
      </div>

      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          loading="lazy"
          className="object-cover w-full h-full"
        />

        {/* Controls overlay */}
        <div className="absolute left-0 w-full h-7 bottom-1.5  flex items-center justify-center ">
          <div className="bg-white/70 backdrop-blur-md rounded-full px-1 flex items-center w-11/12 mx-auto">
            {quantity === 1 ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-transparent"
                onClick={() => onRemove(item.product._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-transparent text-accent hover:text-accent"
                onClick={() =>
                  setQuantity((prev) => {
                    onUpdateQuantity(item.product._id, prev - 1);
                    return prev - 1;
                  })
                }
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}

            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
                onUpdateQuantity(item.product._id, Number(e.target.value));
              }}
              className="w-8 h-7 bg-transparent text-center border-none p-0  focus-visible:ring-0 focus-visible:ring-transparent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-transparent text-accent hover:text-accent"
              onClick={() => {
                if (quantity === item.product.maxQuantityPerOrder) {
                  toast.error(t("toast.max_quantity_reached"));
                  return;
                }
                setQuantity((prev) => {
                  onUpdateQuantity(item.product._id, prev + 1);
                  return prev + 1;
                });
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
