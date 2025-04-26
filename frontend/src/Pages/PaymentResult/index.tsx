import { LangLink } from "@/components/MainComponents";
import { Button } from "@/components/ui/button";
import { routes } from "@/Constants/Routes";
import FormatCurrency from "@/lib/format-currency";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export function Component() {
  const { t } = useTranslation("Checkout");
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const amount = searchParams.get("amount_cents")
    ? Number.parseInt(searchParams.get("amount_cents") || "0") / 100
    : 0;
  const orderId = searchParams.get("id") || "";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-6"
        >
          {success ? (
            <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto" />
          ) : (
            <XCircle className="h-24 w-24 text-red-500 mx-auto" />
          )}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          {success ? "Payment Successful!" : "Payment Failed"}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-gray-600 mb-4"
        >
          {success
            ? t("payment_successful", {
                amount: FormatCurrency(amount),
                orderId,
              })
            : t("payment_failed")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 mt-6"
        >
          {success ? (
            <Button
              asChild
              className="bg-[#ea374a] hover:bg-[#d62f40] text-white"
            >
              <LangLink href={`${routes.items}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("back_to_menu")}
              </LangLink>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline">
                <LangLink href={`${routes.items}`}>
                  {t("back_to_menu")}
                </LangLink>
              </Button>
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <LangLink href={`${routes.checkout}`}>
                  {t("try_again")}
                </LangLink>
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
