'use client';

import ActionBtn from "@/component/ActionBtn";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaSkull } from "react-icons/fa6";

interface OrderItemProps{
    item: CartProductType
}

const OrderItem: React.FC<OrderItemProps>= ({ item }) =>{
    const router = useRouter();
    return <div className="grid grid-cols-4 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <div className="relative w-[70px] aspect-square">
                <img src={item.img[0]} alt={item.name}></img>
            </div>
            <div>
                <div>{truncateText(item.name)}</div>
                <div>{truncateText(item.description)}</div>
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-end font-semibold">
        <ActionBtn icon={FaSkull} onClick={()=>{
            router.push(`/report/${item.id}`)
          }}/>
        </div>
    </div>
}

export default OrderItem;