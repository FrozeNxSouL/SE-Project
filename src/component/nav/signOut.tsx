"use client"
import { signOut } from "next-auth/react";

export default function SignOutButton() {

    return(
        <li><a className="text-error" onClick={() => signOut({redirect: true})}>Logout</a></li>
    )
}