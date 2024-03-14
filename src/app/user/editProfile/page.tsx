"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function EditProfile() {
    const { data: session } = useSession()
    const [tempProfile, setTempProfile] = useState(session?.user?.image)


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setTempProfile(e.target.value)
    }

    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
        <div className="divider text-2xl font-bold">Edit profile</div>
        <div className="flex flex-row p-5 w-full">

            <div className="max-w-40 min-w-40">
                <img className="rounded-full object-cover w-full h-40 ring ring-primary ring-offset-base-100 ring-offset-2" src={tempProfile || session?.user?.image} />
            </div>

            <div className="divider divider-horizontal"></div> 
            <div className="space-y-2 w-full">
                <label className="input input-bordered flex items-center gap-2">
                    name
                    <input type="text" className="grow bg-transparent" placeholder={session?.user?.name || ""} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    email
                    <input type="text" className="grow bg-transparent" placeholder={session?.user?.email || ""} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    phone
                    <input type="text" className="grow bg-transparent" placeholder={session?.user?.name || ""} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    image
                    <input type="text" onChange={handleImage} className="grow bg-transparent" placeholder={session?.user?.name || ""} />
                </label>
            </div>
        </div>
        <button className="btn btn-primary btn-wide">save</button>
    </div>
    )
}