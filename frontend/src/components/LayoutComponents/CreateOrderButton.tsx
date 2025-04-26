import { usePostData } from "@/Hooks/useFetch";
import { queryClient } from "@/lib/query-client-instance";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CREATE_ORDER, GET_CART } from "@/services/api/queries";
import { routes } from "@/Constants/Routes";
import { Order } from "@/types";
import { Cart } from "@/types/cart";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "";

type CreateOrderBody = {
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
  };
  successUrl: string;
};
function CreateOrderButton({ cartItemsCount }: { cartItemsCount: number }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("Checkout");
  const locale = i18n.language;

  const { mutate: createOrder, isPending: isPendingCreatingOrder } =
    usePostData<Order, CreateOrderBody>(CREATE_ORDER, {
      onSuccess: (data) => {
        queryClient.setQueryData([GET_CART], (oldData: Cart | undefined) => {
          return {
            ...oldData,
            cartItems: [],
            cartItemsCount: 0,
            totalPrice: 0,
            finalTotal: 0,
          };
        });
        window.location.href = data.data.paymentDetails.sessionUrl;
      },
    });

  const handleCreateOrder = () => {
    if (cartItemsCount === 0) return;
    createOrder({
      body: {
        paymentMethod: "card",
        shippingAddress: {
          fullName: "John Doe",
          addressLine1: "123 Main St",
          addressLine2: "123 Main St",
          city: "Nasr City",
          state: "Nasr State",
          postalCode: "12345",
          country: "Egypt",
          phoneNumber: "01066031932",
        },
        successUrl: `${FRONTEND_URL}/${locale}${routes.paymentResult}`,
      },
    });
  };

  return (
    <Button
      className="flex-1 h-10 rounded-full  bg-accent hover:bg-accent/90 text-white"
      onClick={handleCreateOrder}
      disabled={isPendingCreatingOrder || cartItemsCount === 0}
      isPending={isPendingCreatingOrder}
    >
      {t("payment")}
    </Button>
  );
}

export default CreateOrderButton;
