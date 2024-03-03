"use client";
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/productInfo";
import Link from "next/link";
import Image from 'next/image'
import { truncateText } from "@/utils/truncateText";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  console.log(item.img)
  const { handleRemoveProductFromCart } = useCart()
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
          <div className="relative w-[70px] aspect-square">
    
            <img src={item.img[0]} alt={item.name} className="object-contain"/>
          </div>
        </Link>
        <div className="flex flex-col">
          <Link className ="font-bold"href={`/product/${item.id}`}>{item.name}</Link>
          <div >{truncateText(item.description)}</div>
          
          {/* <div className="w-[70px]">
            <button className="text-slate-500 underline" onClick={()=>{}}>Remove</button>
          </div> */}
        </div>
        
      </div>

      <div className="col-span-2 justify-self-end font-semibold">{formatPrice(item.price * item.quantity)}</div>
      <button className="btn btn-error w-[70px] justify-self-end" onClick={()=>{handleRemoveProductFromCart(item)}}>Remove</button>
      
      
    </div>
  );
};
export default ItemContent;
