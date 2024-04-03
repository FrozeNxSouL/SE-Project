"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import Address from "./mystore/page";
import Sell from "./sellerManagement/page";
import { redirect } from "next/navigation";

export default function User() {
    redirect("/user/mystore")

    return (
        <div className='flex flex-col items-center bg-base-200 w-full p-5'>
            <div className="divider text-2xl font-bold">Overview</div>
        </div>
    );
}

