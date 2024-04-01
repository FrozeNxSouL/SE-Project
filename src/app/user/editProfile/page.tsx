"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateporfile } from "./editpro";
import { useRouter } from "next/navigation";

export default function EditProfile() {
    const router = useRouter()
    const { data: session } = useSession();
    const [id, setid] = useState(session?.user?.id)
    console.log(session?.user?.id)
    const [tempProfile, setTempProfile] = useState(session?.user?.image || "");
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempProfile(e.target.value);
    };
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setname(e.target.value);
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value);
    };
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setphone(e.target.value);
    };
    const setdefault = ()=>{
        setname("")
        setemail("")
        setphone("")
    }
    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
            <div className="divider text-2xl font-bold">Edit profile</div>
            <div className="flex flex-row p-5 w-full">
                <div className="max-w-40 min-w-40">
                    <img className="rounded-full object-cover w-full h-40 ring ring-primary ring-offset-base-100 ring-offset-2" src={tempProfile || session?.user?.image || ""} />
                </div>

                <div className="divider divider-horizontal"></div>
                <div className="space-y-2 w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        name
                        <input type="text" onChange={(e) => handleName(e)} className="grow bg-transparent" placeholder={session?.user?.name || ""} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        email
                        <input type="text" onChange={(e) => handleEmail(e)} className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        phone
                        <input type="text" onChange={(e) => handlePhone(e)} className="grow bg-transparent" placeholder={session?.user?.phone || ""} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        image
                        <input type="text" onChange={(e) => handleImage(e)} className="grow bg-transparent" placeholder={session?.user?.picture || ""} />
                    </label>
                </div>
            </div>
            <button onClick={() => {
                updateporfile(id, name, email, phone, tempProfile)
                
                setdefault()
                router.refresh()
            }} className="btn btn-primary btn-wide">save</button>
        </div>
    );
}
