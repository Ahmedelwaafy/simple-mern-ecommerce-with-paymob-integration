import { HelmetTags, LangLink } from "@/components/MainComponents";
import ItemDetailSkeleton from "@/components/skeletons/item-detail-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/Constants/Routes";
import { useFetchData, usePostData } from "@/Hooks/useFetch";
import FormatCurrency from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import {
  ADD_TO_CART,
  GET_CART,
  GET_ITEMS_DETAILS,
} from "@/services/api/queries";
import { Item } from "@/types";
import { Cart } from "@/types/cart";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type AddToCartBody = { productId: string; quantity: number };

export function Component() {
  const { t, i18n } = useTranslation("ItemDetails");
  const locale = i18n.language;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: item, isPending } = useFetchData<Item>(GET_ITEMS_DETAILS, {
    params: { id: id! },
  });

  const { mutate: addToCart, isPending: isPendingAddingToCart } = usePostData<
    Cart,
    AddToCartBody
  >(ADD_TO_CART, {
    onSuccess: (data) => {
      /* queryClient.refetchQueries({
        queryKey: [GET_CART],
      }); */
      queryClient.setQueryData([GET_CART], (oldData: Cart | undefined) => {
        return data.data; // update the card data in the cache with fresh data comes from the server, to avoid the need of refetching the cart data
      });
      navigate(`/${locale}${routes.items}`);
    },
  });

  const handleAddToCart = () => {
    if (!item?._id) return;
    if (quantity <= 0) {
      toast.error(t("toast.quantity_must_be_greater_than_0"));
      return;
    }

    addToCart({ body: { productId: item._id, quantity } });
  };
  if (isPending) {
    return <ItemDetailSkeleton />;
  }

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>{t("item_not_found")}</p>
        <LangLink href={routes.items} className="mt-4">
          {t("back_to_items")}
        </LangLink>
      </div>
    );
  }
  return (
    <>
      <HelmetTags
        title={t("tab.title", { itemName: item.name })}
        description={item.description || ""}
        canonical={`${routes.items}/${item._id}/${item.name?.replace(
          /\s/g,
          "-"
        )}`}
      />
      <section className="flex flex-col min-h-screen">
        <div className="relative h-[35vh]  bg-gray-100 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 z-10 bg-white/70 backdrop-blur-sm rounded-full"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="!h-6 !w-6" />
          </Button>
          <img
            src={item.imageCover || "/placeholder.svg"}
            alt={item.name}
            className="object-cover w-full h-full hover:scale-110 transition-all duration-1000 ease-in-out"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <motion.h1
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {item.description}
          </motion.p>

          <div className="mt-auto">
            <motion.div
              className="flex items-center justify-between mb-7 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center border rounded-full overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-none h-10 w-10 ",
                    {
                      "text-accent": quantity > 1,
                    },
                    "hover:text-white"
                  )}
                  onClick={() => setQuantity((prev) => prev - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className={cn("h-4 w-4")} />
                </Button>

                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-10 text-center border-none p-0  focus-visible:ring-0 focus-visible:ring-transparent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-none h-10 w-10 text-accent hover:text-white"
                  )}
                  onClick={() => {
                    if (quantity === item.maxQuantityPerOrder) {
                      toast.error(t("toast.max_quantity_reached"));
                      return;
                    }
                    setQuantity((prev) => prev + 1);
                  }}
                >
                  <Plus className={cn("h-4 w-4")} />
                </Button>
              </div>

              <Button
                isPending={isPendingAddingToCart}
                disabled={isPendingAddingToCart}
                onClick={handleAddToCart}
                className={cn(
                  "bg-accent hover:bg-accent/90 text-white rounded-full px-6 grow justify-between tracking-wide",
                  {
                    "justify-center": isPendingAddingToCart,
                  }
                )}
              >
                {t("add_item")}
                <span>{FormatCurrency(item.price)}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
