"use client";

import { useState } from "react";
import { auction } from "@/component/variables";
import { stringSpliter } from "@/component/panel/auction";
import { updateExpiredStatus } from "@/api/action/fetch";
import { callUpdateData } from "@/app/auction/[auctionId]/page";


export default function CountdownTimer(props: any) {
    // console.log(props.data)
    const auctionOBJ = props.data;
    const { isExpired, setIsExpired } = props;
    // const [expired, setExpired] = useState(false)

    const timeFormater = (item: auction) => {
        let day = stringSpliter(item, 0);
        if (day == "Ended") {
            setIsExpired(true)
            callUpdateData(auctionOBJ[0].id)
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
            {/* {isExpired && (
                <div className="text-center p-3">
                    <h1 className="text-5xl">ฝันดีนะ ปูนปูน</h1>
                </div>
            )} */}
            {!isExpired && (
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": stringSpliter(auctionOBJ[0], 0) }}></span>
                        </span>
                        days
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": stringSpliter(auctionOBJ[0], 1) }}></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": stringSpliter(auctionOBJ[0], 2) }}></span>
                        </span>
                        min
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": stringSpliter(auctionOBJ[0], 3) }}></span>
                        </span>
                        sec
                    </div>
                </div>
            )}
        </div>
    )
}
