"use client";
import { useEffect, useState } from "react";
import { updateporfile } from "./editpro";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { validateName } from "@/app/validation/validation";

export default function EditProfile(props: any) {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [tempProfile, setTempProfile] = useState<string>(props.data);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            setTempProfile(session?.user.picture ?? "");
        }
      }, [sessionStatus]);

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setname(e.target.value);
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value);
    };
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setphone(e.target.value);
    };
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value != session?.user.picture) {
            setTempProfile(e.target.value);
        }
    };
    const handleSubmit = async ()=> {
        try {
            await validateName(name);
            const res = await updateporfile(session?.user.id, name, email, phone, tempProfile);
            setSuccess(res);
        } catch (e: any) {
            setError(e.message);
        }
        router.refresh();
    }

    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
            <div className="divider text-2xl font-bold">Edit profile</div>
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
                <div role="alert" className="alert alert-success m-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{success}</span>
                    <div>
                        <button className="btn btn-error btn-sm" onClick={() => { setSuccess(null) }}><span className="material-icons">close</span></button>
                    </div>
                </div>
            )}
            <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="avatar">
                    <div className="size-48 rounded">
                        <img src={tempProfile} />
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        Image
                        <kbd className="kbd kbd-sm"><span className="material-icons">link</span></kbd>
                        <input className="grow bg-transparent" onChange={handleImage}/>
                    </label>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-row p-5 w-full">
                <div className="space-y-2 w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        name
                        <input type="text" value={name} onChange={(e) => handleName(e)} className="grow bg-transparent" placeholder={session?.user?.name || ""} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        email
                        <input type="text" value={email} onChange={(e) => handleEmail(e)} className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        phone
                        <input type="text" value={phone} onChange={(e) => handlePhone(e)} className="grow bg-transparent" placeholder={session?.user?.phone || ""} />
                    </label>
                </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-wide">save</button>
        </div>
    );
}
