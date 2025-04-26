import { routes } from "@/Constants/Routes";
import { useFetchData } from "@/Hooks/useFetch";
import FormatCurrency from "@/lib/format-currency";
import { GET_CART } from "@/services/api/queries";
import { Cart } from "@/types/cart";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LangLink } from "../MainComponents";

function FloatingCartButton() {
  const { t } = useTranslation("HomePage");
  const { data: cart } = useFetchData<Cart>(GET_CART, {
    queryOptions: { gcTime: Infinity },
  });
  if (!cart || cart?.cartItems.length === 0) {
    return;
  }
  return (
    <AnimatePresence>
      <motion.div
        className="fixed !bottom-7  px-5 w-full max-w-sm mx-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <LangLink
          href={`${routes.checkout}`}
          className="w-full h-11 flex items-center justify-between px-2 bg-accent text-white rounded-full"
        >
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-[#BB2C3B]  text-white flex items-center justify-center ">
              {cart.totalCartItems}
            </div>
            <span className="text-sm font-medium">
              {t("FloatingCartButton.view")}
            </span>
          </div>
          <span className="text-sm font-semibold px-2">
            {FormatCurrency(cart.totalPrice)}
          </span>
        </LangLink>
      </motion.div>
    </AnimatePresence>
  );
}

export default FloatingCartButton;
