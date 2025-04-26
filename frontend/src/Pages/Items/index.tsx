import MenuItemCard from "@/components/cards/menu-item-card";
import { HelmetTags } from "@/components/MainComponents";
import MenuItemSkeleton from "@/components/skeletons/menu-item-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchData } from "@/Hooks/useFetch";
import { GET_CATEGORIES_LIST, GET_ITEMS_LIST } from "@/services/api/queries";
import { Category, Item, Option, PaginatedResponse } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const FloatingCartButton = React.lazy(
  () => import("@/components/LayoutComponents/FloatingCartButton")
);

export function Component() {
  const { t } = useTranslation("HomePage");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const category = searchParams.get("category");

  const { data: items, isPending } = useFetchData<PaginatedResponse<Item>>(
    GET_ITEMS_LIST,
    {
      query: { limit, page, ...(category && { category }) },
    }
  );

  const { data: categories } = useFetchData<
    PaginatedResponse<Category>,
    Option[]
  >(GET_CATEGORIES_LIST, {
    queryOptions: {
      select: (data) => {
        const options = data.data.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        return [{ label: t("all_categories"), value: "all" }, ...options];
      },
    },
  });

  // Loading skeletons
  const renderSkeletons = () => {
    return Array(10)
      .fill(0)
      .map((_, index) => <MenuItemSkeleton key={index} />);
  };
  return (
    <>
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical=""
      />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen pb-20">
        {/* Hero Image */}
        <div className="relative w-full h-[35vh]">
          <div className="absolute inset-0 bg-accent/20 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/27/19/23/tart-1283822_960_720.jpg"
              alt="hero"
              className="object-cover w-full h-full hover:scale-110 transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>
        {/* Tabs using shadcn/ui */}
        <Tabs defaultValue="deserts" className="w-full">
          <TabsList className="w-full flex justify-start rtl:flex-row-reverse rounded-none shadow-md py-3 bg-transparent h-auto">
            <TabsTrigger
              value="deserts"
              className="data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:shadow-none rounded-none   bg-transparent"
            >
              {t("tabs.deserts")}
            </TabsTrigger>
            <TabsTrigger
              value="boxes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:shadow-none rounded-none   bg-transparent"
            >
              {t("tabs.boxes")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deserts" className="mt-0">
            {/* Section Header with Category Filter */}
            <div className="flex items-center rtl:flex-row-reverse justify-between mt-6 mb-4 px-4">
              <div className="flex items-center rtl:flex-row-reverse gap-3">
                <div className="w-1 h-6 bg-accent "></div>
                <h2 className="text-xl font-medium ">
                  {t("deserts", { count: items?.data.length ?? 0 })}
                </h2>
              </div>

              {categories && categories.length > 1 && (
                <Select
                  value={category || "all"}
                  onValueChange={(value: string) =>
                    setSearchParams(
                      (params) => {
                        value === "all"
                          ? params.delete("category")
                          : params.set("category", value);
                        return params;
                      },
                      { replace: true }
                    )
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="capitalize focus:text-white"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Product List */}
            <div className="px-4">
              {isPending ? (
                <div className="divide-y">{renderSkeletons()}</div>
              ) : items && items?.data?.length > 0 ? (
                <div className="divide-y">
                  <AnimatePresence>
                    {items?.data.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <MenuItemCard item={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  {t("no_items")}
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="boxes" className="mt-0">
            {/* Section Header with Category Filter */}
            <div className="flex items-center justify-between rtl:flex-row-reverse  mt-6 mb-4 px-4">
              <div className="flex items-center rtl:flex-row-reverse gap-3">
                <div className="w-1 h-8 bg-accent "></div>
                <h2 className="text-2xl font-medium ">{t("tabs.boxes")}</h2>
              </div>
            </div>
            <p className="text-muted-foreground text-center">{t("no_boxes")}</p>
          </TabsContent>
        </Tabs>
        {/* Floating Cart Button */}{" "}
        <Suspense fallback={null}>
          <FloatingCartButton />
        </Suspense>
      </div>
    </>
  );
}
