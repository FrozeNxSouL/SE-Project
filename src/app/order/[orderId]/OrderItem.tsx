'use client';

import ActionBtn from "@/component/ActionBtn";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaSkull } from "react-icons/fa6";
import { FaStar } from "react-icons/fa"
import { useState } from "react";
import { updateOwnerScore } from "@/app/admin/fetch";

interface OrderItemProps{
    item: CartProductType
}

const OrderItem: React.FC<OrderItemProps>= ({ item }) =>{
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const router = useRouter();
    
    return <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t[1.5px] border-slate-200 py-4 items-center">
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
        <div className="justify-self-end font-semibold flex gap-1">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                    <label>
                        <input 
                            type="radio"
                            name ="rating"
                            value={currentRating}
                            className="hidden"
                        />
                        <FaStar 
                            className="star cursor-pointer" 
                            key={index} 
                            size={20} 
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => {
                                setRating(currentRating);
                                updateOwnerScore(item.id, currentRating);
                            }}
                        />
                    </label>
                );
            })}
        </div>
    </div>
}

export default OrderItem;
