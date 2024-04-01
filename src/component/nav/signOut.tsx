"use client"
import { signOut } from "next-auth/react";

export default function SignOutButton() {

    const handleSignOut = async () => {
        localStorage.clear()
        await signOut({
          callbackUrl: '/' // Redirect to the login page after logout
        })
      }
    return(
        <li><a className="text-error" onClick={() => handleSignOut()}>Logout</a></li>

    )
}