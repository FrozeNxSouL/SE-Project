"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import updateAddr from "./changeFunction";

export default function ChangeAddr() {
    const { data: session, status: sessionStatus } = useSession();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [address, setAddress] = useState({
        addr1: session?.user?.address[0] || "",
        addr2: session?.user?.address[1] || "",
        city: session?.user?.address[2] || "City",
        state: session?.user?.address[3] || "State",
        postal: session?.user?.address[4] || "Postal code"
    });

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            setAddress({
                addr1: session?.user?.address[0] || "",
                addr2: session?.user?.address[1] || "",
                city: session?.user?.address[2] || "City",
                state: session?.user?.address[3] || "State",
                postal: session?.user?.address[4] || "Postal code"
            });
            console.log(address)
        }
      }, [sessionStatus]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await updateAddr([
                address.addr1,
                address.addr2,
                address.city,
                address.state,
                address.postal
            ], session);
            setSuccess(res);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
            <div className="divider text-2xl font-bold">Address</div>
            {error && (
                <div role="alert" className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{error}</span>
                    <div>
                        <button className="btn btn-error btn-sm" onClick={() => { setError(null) }}><span className="material-icons">close</span></button>
                    </div>
                </div>
            )}
            {success && (
                <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{success}</span>
                    <div>
                        <button className="btn btn-error btn-sm" onClick={() => { setSuccess(null) }}><span className="material-icons">close</span></button>
                    </div>
                </div>
            )}
            <div className="flex flex-row p-5 w-full justify-center">
                <div className="space-y-2">
                    <label className="input input-bordered flex items-center gap-2">
                        Address 1
                        <input
                            type="text"
                            name="addr1"
                            value={address.addr1}
                            onChange={handleChange}
                            className="grow bg-transparent"
                            placeholder="address 1"
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Address 2
                        <input
                            type="text"
                            name="addr2"
                            value={address.addr2}
                            onChange={handleChange}
                            className="grow bg-transparent"
                            placeholder="address 2"
                        />
                    </label>
                    <div className="join w-full">
                        <label className="input input-bordered flex items-center gap-2 join-item">
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                className="grow bg-transparent"
                                placeholder="City"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 join-item">
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                className="grow bg-transparent"
                                placeholder="State"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 join-item">
                            <input
                                type="number"
                                name="postal"
                                value={address.postal}
                                onChange={handleChange}
                                className="grow bg-transparent"
                                placeholder="Postal number"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-wide" onClick={handleSubmit}>Save</button>
        </div>
    );
}
