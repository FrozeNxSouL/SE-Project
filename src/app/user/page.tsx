"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import EditProfile from "./editProfile";
import Address from "./address";
import ChangePassword from "./changePassword";

export default function user() {
    const { data: session } = useSession();
    const [tab, setTab] = useState("overview");

    const handleTabChange = (t: string)=> {
        setTab(t)
    }

    const handlePageChange = ()=> {
        switch (tab) {
            case "editprofile" :
                return(<EditProfile />)
            case "address" :
                return(<Address />)
            case "changepassword" :
                return(<ChangePassword />)
            default :
                return(<>ยังไม่ได้ทำครับพี่</>)
        }
    }

    return (
        <div className='flex flex-row gap-5 bg-base-100 p-5 max-w-screen-xl mx-auto min-h-screen'>
            <ul className="menu bg-base-200 min-w-56 max-h-">
                <li><a onClick={()=> handleTabChange("overview")}><span className="material-icons">home</span>Overview</a></li>
                <li>
                    <details open>
                    <summary><span className="material-icons">person</span>My Account</summary>
                    <ul>
                        <li><a onClick={()=> handleTabChange("editprofile")}>Edit profile</a></li>
                        <li><a onClick={()=> handleTabChange("address")}>Address</a></li>
                        <li><a onClick={()=> handleTabChange("changepassword")}>Change password</a></li>
                    </ul>
                    </details>
                </li>
                <li><a><span className="material-icons">receipt_long</span>My purchase</a></li>
            </ul>
            {handlePageChange()}
        </div>
    );
}

