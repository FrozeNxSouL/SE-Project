"use client"
import { useRef } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const showLogin = true;
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
        <div className="py-10">
            {showLogin && (
                <div className="max-w-lg mx-auto p-12 shadow-xl bg-base-100">
                    <h1 className="text-2xl text-primary font-extrabold pb-6 text-center">Sign in</h1>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input name="email" type="text" className="grow bg-transparent" placeholder="Email" ref={email} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input name="password" type="password" className="grow bg-transparent" placeholder="Password" ref={password}/>
                    </label>
                    <div className="flex flex-col justify-center">
                        <button className="btn btn-primary btn-block my-2" onClick={handleSignIn}>sign in</button>
                        <div className="divider">Don't have an account?</div>
                        <button className="btn btn-block my-2">sign up</button>
                    </div>
                </div>
            )}
            {/* {!showLogin && (
                <div className="max-w-lg mx-auto p-12 shadow-xl bg-base-100">
                <h1 className="text-2xl text-primary font-extrabold pb-6 text-center">Sign up</h1>
                <form action={formActionSignUp}>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input name="email" type="text" className="grow bg-transparent " placeholder="Email" />
                </label>
                {errorCode == 1 && (
                    <div className="label">
                        <span className="label-text-alt text-error">Invalid email</span>
                    </div>
                )}
                {errorCode == 4 && (
                    <div className="label">
                        <span className="label-text-alt text-error">This email has been registered</span>
                    </div>
                )}
                <label className="input input-bordered flex items-center gap-2 my-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input name="name" type="text" className="grow bg-transparent" placeholder="Name" />
                </label>
                {errorCode == 2 && (
                        <div className="label">
                            <span className="label-text-alt text-error">Can't use this name</span>
                        </div>
                )}
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="password" type="password" className="grow bg-transparent" placeholder="Password"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="re-password" type="password" className="grow bg-transparent" placeholder="Re-password"/>
                </label>
                {errorCode == 3 && (
                        <div className="label">
                            <span className="label-text-alt text-error">Password does not match</span>
                        </div>
                )}

                <div className="flex flex-col w-full border-opacity-50">
                    <button className="btn btn-primary btn-block my-2">sign up</button>
                    <div className="divider">Already have an account?</div>
                    <button className="btn btn-block my-2" onClick={toggleForm}>sign in</button>
                </div>
                </form>
            </div>
            )} */}
        </div>

    );
}

