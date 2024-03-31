"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function User() {
    const { data: session } = useSession();

    return (
        <div className='flex flex-col items-center bg-base-200 w-full p-5'>
            <div className="divider text-2xl font-bold">Overview</div>
        </div>
    );
}

