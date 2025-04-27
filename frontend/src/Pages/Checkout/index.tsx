"use client";

import CartItemCard from "@/components/cards/cart-item-card";
import CreateOrderButton from "@/components/LayoutComponents/CreateOrderButton";
import { HelmetTags, LangLink } from "@/components/MainComponents";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { routes } from "@/Constants/Routes";
import { usePostData } from "@/Hooks/useFetch";
import FormatCurrency from "@/lib/format-currency";
import {
  DELETE_ITEM_FROM_CART,
  GET_CART,
  UPDATE_CART,
} from "@/services/api/queries";
import { Cart } from "@/types/cart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UpdateCartBody = { productId: string; quantity: number };

export function Component() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { t, i18n } = useTranslation("Checkout");
  const locale = i18n.language;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // access cart data from Tanstack Query store
  const { data: cart } = useQuery<Cart>({
    queryKey: [GET_CART],
  });
  console.log({ checkoutCart: cart });

  const { mutateAsync: updateCart } = usePostData<Cart, UpdateCartBody>(
    UPDATE_CART,
    {
      onSuccess: (data) => {
        queryClient.setQueryData([GET_CART], (oldData: Cart | undefined) => {
          return data.data;
        });
      },
    }
  );

  const { mutateAsync: deleteItemFromCart } = usePostData<Cart>(
    DELETE_ITEM_FROM_CART,
    {
      onSuccess: (data) => {
        queryClient.setQueryData([GET_CART], (oldData: Cart | undefined) => {
          return data.data;
        });
      },
    }
  );

  const updateItemQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      toast.error(t("toast.quantity_must_be_greater_than_0"));
      return;
    }
    try {
      await updateCart({ body: { productId, quantity } });
    } catch (error) {
      console.log({ error });
      queryClient.refetchQueries({
        queryKey: [GET_CART],
      });
    }
  };
  const removeItem = async (id: string) => {
    await deleteItemFromCart({ params: { id }, body: {} });
  };

  return (
    <>
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical={`${locale}/${routes.checkout}`}
      />
      <section className="flex flex-col min-h-screen pb-24">
        <header className="sticky top-0 z-10 bg-white px-5 py-3 border-b flex flex-col items-start rtl:ltr">
          <Button
            variant="ghost"
            className="!p-0 w-auto h-auto hover:bg-transparent !px-0 !py-0 -ml-1.5"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="!h-6 !w-6" />
          </Button>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
        </header>

        <div className="p-5 flex-1 flex flex-col">
          <h2 className="font-semibold text-lg mb-4">{t("items")}</h2>

          {cart?.cartItems?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">{t("cart_empty")}</p>
              <LangLink href={`${routes.items}`}>{t("browse_items")}</LangLink>
            </div>
          ) : (
            <motion.div
              className="space-y-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {cart?.cartItems?.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CartItemCard
                    item={item}
                    onUpdateQuantity={updateItemQuantity}
                    onRemove={removeItem}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {cart && cart?.cartItems?.length > 0 && (
            <>
              <motion.div
                className=" rounded-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h2 className="font-semibold text-lg mb-3">
                  {t("payment_summary")}
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span> {t("subtotal")}</span>
                    <span>
                      {FormatCurrency(
                        cart.totalPriceAfterDiscount || cart.totalPrice
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span> {t("delivery_fee")}</span>
                    <span>{FormatCurrency(cart.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span> {t("total_amount")}</span>
                    <span>{FormatCurrency(cart.finalTotal)}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h2 className="font-semibold text-lg mb-3">
                  {t("payment_method")}
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <Label
                    htmlFor="card"
                    className="flex items-center justify-between space-x-2 bg-accent text-white p-3 rounded-full mb-3 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-white">
                      <CreditCard className="h-5 w-5" />
                      XXXX-7319
                    </span>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="text-white border-white"
                    />
                  </Label>

                  <Label
                    className="flex items-center justify-between space-x-2 bg-white text-foreground shadow-md border p-3 rounded-full mb-3 cursor-pointer"
                    htmlFor="new-card"
                  >
                    <span className="flex items-center gap-2 font-medium ">
                      <CreditCard className="h-5 w-5" />
                      {t("add_card")}
                    </span>

                    <RadioGroupItem
                      value="new-card"
                      id="new-card"
                      className="text-accent border-accent "
                    />
                  </Label>
                </RadioGroup>
              </motion.div>

              <motion.div
                className="flex gap-3 mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <LangLink
                  href={routes.items}
                  className="h-10 rounded-full border border-foreground flex-center flex-1"
                >
                  {t("add_items")}
                </LangLink>
                <CreateOrderButton cartItemsCount={cart?.totalCartItems} />
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
