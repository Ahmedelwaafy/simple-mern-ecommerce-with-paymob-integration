import FormatCurrency from "@/lib/format-currency";
import { Item } from "@/types";
import { LangLink } from "../MainComponents";
import { routes } from "@/Constants/Routes";

interface MenuItemCardProps {
  item: Item;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <LangLink
      href={`${routes.items}/${item._id}/${item.name?.replace(/\s/g, "-")}`}
      className="flex py-4 cursor-pointer hover:bg-accent/10 rounded-lg transition-all ease-in-out duration-300"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <img
          src={item.imageCover || "/placeholder.svg"}
          alt={item.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 rtl:rtl">
        <h3 className="text- font-semibold ">{item.name}</h3>
        <p className="text-xs font-thin opacity-80  line-clamp-2">
          {item.description}
        </p>
        <p className="text-sm font-semibold mt-1">
          {FormatCurrency(item.price)}
        </p>
      </div>
    </LangLink>
  );
}
