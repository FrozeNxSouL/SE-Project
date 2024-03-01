"use client"
import { useRef } from 'react'
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function LoginForm2() {
    const router = useRouter()
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const handleSignIn = async ()=> {
        const res = await signIn("credentials", {
            email: email.current?.value,
            password: password.current?.value,
            redirect: false
        })

        if (res?.error) {
            console.log(res.error)
        } else {
            router.refresh()
            router.push("/")
        }
    }

    return (
        <div className="max-w-screen-lg mx-auto">
            <input name="email" placeholder="email" type="email" ref={email}/>
            <br></br>
            <input name="password" placeholder="password" type="password" ref={password}/>
            <br></br>
            <button onClick={handleSignIn}>login</button>
        </div>
    )
}