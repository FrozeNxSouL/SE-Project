"use client";
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/productInfo";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  return (
    <div
      className="
        grid
        grid-cols-5
        text-xs
        md:text-sm
        gap-4
        border-t-[1.5px]
        border-slate-200
        py-4
        items-center
        "
    >
      <div
        className="
                col-span-2
                justify-self-start
                flex
                gap-2
                md:gap-4
            "
      >
        <Link href={`/product/${item.id}`}>
          <div></div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{item.name}</Link>
        </div>
      </div>

      <div>{formatPrice(item.price)}</div>
      <div></div>
    </div>
  );
};
export default ItemContent;
