"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import updatePassword from "./changeFunction";

export default function ChangePassword() {
    const {data: session} = useSession();
    const [currentPass, setCurrentPass] = useState<string | null>(null);
    const [newPass1, setNewPass1] = useState<string | null>(null);
    const [newPass2, setNewPass2] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = ()=> {
        try {
            update();
        } catch (e: any) {
            setError(e.message);
        }
    }
    const update = async ()=> {
        try {
            const res = await updatePassword(currentPass, newPass1, newPass2, session);
            setSuccess(res);
        } catch (e: any) {
            setError(e.message);
        }
    }

    const handleCurrentPass = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setCurrentPass(e.target.value);
    }
    const handlePass1 = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setNewPass1(e.target.value);
    }
    const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setNewPass2(e.target.value);
    }
    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
            <div className="divider text-2xl font-bold">Change password</div>
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
                <div className="space-y-2 w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        Current password
                        <input type="password" className="grow bg-transparent" onChange={handleCurrentPass} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Password
                        <input type="password" className="grow bg-transparent" onChange={handlePass1} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Confirm password
                        <input type="password" className="grow bg-transparent" onChange={handlePass2} />
                    </label>
                </div>
            </div>
            <button className="btn btn-primary btn-wide" onClick={handleSubmit}>Confirm</button>
        </div>
    )
}
