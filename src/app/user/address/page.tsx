"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Address() {
    const { data: session } = useSession()


    return (
            <div className="flex flex-col items-center bg-base-200 w-full p-5">
                <div className="divider text-2xl font-bold">Address</div>
                <div className="flex flex-row p-5 w-full justify-center">
                    <div className="space-y-2">
                        <label className="input input-bordered flex items-center gap-2">
                            fullname
                            <input type="text" className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Address 1
                            <input type="text" className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Address 2
                            <input type="text" className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                        </label>
                        
                        <div className="join w-full">
                                <label className="input input-bordered flex items-center gap-2 join-item">
                                    <input type="text" className="grow bg-transparent" placeholder="City" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 join-item">
                                    <input type="text" className="grow bg-transparent" placeholder="Province" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 join-item">
                                    <input type="text" className="grow bg-transparent" placeholder="Zip" />
                                </label>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-wide">save</button>
            </div>
    )
}