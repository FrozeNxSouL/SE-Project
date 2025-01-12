"use client"

import { useState } from "react"
import { useSession } from "next-auth/react";
import Order from "./order";
import Managed from "./managed";
import Completed from "./completed";
import { updateProductStatus } from "@/app/action/fetch";
import { useRouter } from "next/navigation";

export default function SellerClient(props: any) {
    const session = props.session
    const output1 = props.order
    const output2 = props.pending
    const output3 = props.complete
    const [option, setOption] = useState("1");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
        console.log(event.target.value)
    };

    const handleManage = (ID:string) => {
        updateProductStatus(ID);
    }

    return (
        <div className="flex flex-col items-center bg-base-100 max-w-screen-xl w-full mx-auto min-h-screen gap-2">
            <div className="join p-12">
                <input className="join-item btn w-32" type="radio" name="options" value={"1"} onChange={handleChange} aria-label="Order" />
                <input className="join-item btn w-32" type="radio" name="options" value={"2"} onChange={handleChange} aria-label="Managed" />
                <input className="join-item btn w-32" type="radio" name="options" value={"3"} onChange={handleChange} aria-label="Completed" />
            </div>
            {(option == "1") && (

                <Order data={output1} session={session} managed={handleManage}/>

            )}
            {(option == "2") && (

                <Managed data={output2} session={session} />
            )}

            {(option == "3") && (

                <Completed data={output3} session={session} />

            )}



        </div>
    )
}

