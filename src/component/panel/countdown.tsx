"use client";

import { useState } from "react";
import { auction } from "@/component/variables";
import { stringSpliter } from "@/component/panel/auction";
import { updateExpiredStatus } from "@/api/action/fetch";
import  allUpdateData  from "@/app/auction/[auctionId]/page";
// import { updateExpired } from "@/app/auction/[auctionId]/auctionInfo";


export default function CountdownTimer(props: any) {
    // console.log(props.data)
    const auctionOBJ = props.data;
    const { isExpired, setIsExpired } = props;
    // const [expired, setExpired] = useState(false)

    const timeFormater = (item: auction) => {
        let day = stringSpliter(item, 0);
        if (day == "Ended") {
            setIsExpired(true)
            allUpdateData(auctionOBJ[0].id)
            // console.log(props.data, "EXP")
            return
        } else {
            return
        }
    }

    if (!isExpired) {
        timeFormater(auctionOBJ[0]);
    }

    return (
        <div>
            {!isExpired && (
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    {stringSpliter(auctionOBJ[0], 0) != "0" && (
                        <div className="flex flex-col">
                            <span className="font-medium font-sans text-5xl">
                                <span>{stringSpliter(auctionOBJ[0], 0) }</span>
                            </span>
                            days
                        </div>
                    )}
                    {stringSpliter(auctionOBJ[0], 1) != "0" && (
                        <div className="flex flex-col">
                            <span className=" font-medium font-sans text-5xl">
                                <span>{stringSpliter(auctionOBJ[0], 1) }</span>
                            </span>
                            hours
                        </div>
                    )}
                    {stringSpliter(auctionOBJ[0], 2) != "0" && (
                        <div className="flex flex-col">
                            <span className=" font-medium font-sans text-5xl">
                                <span>{stringSpliter(auctionOBJ[0], 2)}</span>
                            </span>
                            min
                        </div>
                    )}
                    {stringSpliter(auctionOBJ[0], 3) != "0" && (
                        <div className="flex flex-col">
                            <span className=" font-medium font-sans text-5xl">
                                <span>{stringSpliter(auctionOBJ[0], 3)}</span>
                            </span>
                            sec
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
