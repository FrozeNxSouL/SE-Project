"use client"

import { useSession } from "next-auth/react"
import SignOutButton from "./signOut"
import Link from "next/link";


function UserProfile() {
    const session = useSession();
    return (
        <>{session.data ? (
            <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">
                    <a href="/user">
                        <span className="material-icons">person</span>
                    </a>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <div className="mx-auto flex flex-col">
                        <div className="avatar mx-auto">
                            <div className="w-16 rounded-full">
                                <img src={session.data.user?.picture || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                            </div>
                        </div>
                        <span className="font-semibold text-lg text-center">{session.data.user?.name}</span>
                    </div>
                    <div className="divider"></div>
                    <li><a href="/user">Account</a></li>
                    <li><a href="/user/mystore">My Store</a></li>
                    <li><a href="/orders">My Purchase</a></li>
                    <li><a href="/wallet-add">My Wallet</a></li>
                    <div className="divider"></div>
                    {session.data.user?.role == "manager" && (
                        <li><a href="/admin">Admin</a></li>
                    )}
                    <SignOutButton />
                </ul>
            </div>
        ) : (
            <Link href="/auth/login" className="btn btn-primary btn-outline mx-2">sign in</Link>
        )}
        </>
    )
}

export default UserProfile