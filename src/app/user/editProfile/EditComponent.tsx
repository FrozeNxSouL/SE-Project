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
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleButtonClick = () => {
        if (!fileInputRef) {
            throw new Error("");
        }
        fileInputRef.current?.click();
    };
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected files
        try {
            applyImage(file);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const applyImage = (file: File | undefined) => {
        if (file) {
            if (file.size > 200000) {
                throw new Error(`Image is too big (under 200kb)`);
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async ()=> {
        try {
            await validateName(name);
            await updateporfile(session?.user.id, name, email, phone, tempProfile);
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
            <div className="flex flex-row p-5 w-full">
                <div className="avatar">
                    <div className="size-48 rounded">
                        <button className="size-48 opacity-0 hover:opacity-50 bg-base-100 absolute flex items-center justify-center cursor-pointer transition" onClick={handleButtonClick}>
                        <span className="material-icons !text-8xl">drive_folder_upload</span>
                        </button>
                        <input ref={fileInputRef} onChange={handleFileSelect} type="file" className="hidden" accept="image/jpeg" />
                        <img src={tempProfile} />
                    </div>
                </div>

                <div className="divider divider-horizontal"></div>
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
