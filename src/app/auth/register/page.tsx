"use client"
import { signIn } from "next-auth/react";
import { signUpForm, signup } from "./signup";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<String | null>(null)
    const email = useRef<HTMLInputElement>(null)
    const name = useRef<HTMLInputElement>(null)
    const repassword = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const router = useRouter();
    const session = useSession();

    if (session.data?.user) {
        router.push("/");
    }

    const handleSignUp = async () => {
        const formData: signUpForm = {
            email: email.current?.value || "",
            name: name.current?.value || "",
            pass: password.current?.value || "",
            rePass: repassword.current?.value || "",
        }
        try {
            await signup(formData);

            const res = await signIn("credentials", {
                email: email.current?.value,
                password: password.current?.value,
                redirect: false
            })
    
            if (res?.error) {
                setError(res.error)
            } else {
                router.refresh()
                router.push("/")
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleClose = () => {
        setError(null)
    }

    return (
        <div className="py-10">
            <div className="max-w-lg mx-auto p-12 shadow-xl bg-base-100">
                <h1 className="text-2xl text-primary font-extrabold pb-6 text-center">Sign up</h1>
                {error && (
                    <div role="alert" className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{error}</span>
                        <div>
                            <button className="btn btn-error btn-sm" onClick={() => { setError(null) }}><span className="material-icons">close</span></button>
                        </div>
                    </div>
                )}

                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input name="email" type="text" className="grow bg-transparent " placeholder="Email" ref={email} />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input name="name" type="text" className="grow bg-transparent" placeholder="Name" ref={name} />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="password" type="password" className="grow bg-transparent" placeholder="Password" ref={password} />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="re-password" type="password" className="grow bg-transparent" placeholder="Re-password" ref={repassword} />
                </label>

                <div className="flex flex-col w-full border-opacity-50">
                    <button className="btn btn-primary btn-block my-2" onClick={handleSignUp}>sign up</button>
                    <div className="divider">Already have an account?</div>
                    <a className="btn btn-block my-2" href="/auth/login">sign in</a>
                </div>
            </div>
        </div>

    );
}

