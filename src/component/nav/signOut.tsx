"use client"
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignOutButton() {

    const handleSignOut = async () => {
        await signOut({
          callbackUrl: '/' // Redirect to the login page after logout
        })
      }
    return(
        <li><a className="text-error" onClick={() => handleSignOut()}>Logout</a></li>

    )
}