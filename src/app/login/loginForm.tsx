"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signup } from '@/action/signup';

const initialState = {
    id: 0,
    label: "",
}

export default function AuthForm() {
    const [state, formActionSignUp] = useFormState(signup, initialState)
    const [errorCode, setErrorCode] = useState(0);
    const [errorLabel, setErrorLabel] = useState("");

    useEffect(()=> {
        setErrorCode(state?.id || 0);
        setErrorLabel(state?.label || "");
        console.log(errorCode)
    },[state, setErrorCode, setErrorLabel])

    return (
        <div className="bg-base-100">
            <div className="w-1/4 mx-auto p-12 rounded-lg shadow-xl">
                <h1 className="text-2xl text-primary font-bold pb-6 text-center">Login</h1>
                <form action="">
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow bg-transparent" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow bg-transparent" placeholder="Password"/>
                </label>
                <div className="flex flex-col justify-center">
                    <button className="btn btn-primary btn-block my-2">sign in</button>
                    <hr className="m-3"></hr>
                    <span className="text-center">Don't have an account?</span>
                    <button className="btn btn-block my-2">sign up</button>
                </div>
                </form>
            </div>
            <div className="w-1/4 mx-auto p-12 rounded-lg shadow-xl">
                <h1 className="text-2xl text-primary font-bold pb-6 text-center">Sign up</h1>
                <form action={formActionSignUp}>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input name="email" type="text" className="grow bg-transparent " placeholder="Email" />
                    {errorCode == 1 && (
                        <span className="badge badge-error">invalid mail</span>
                    )}
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input name="name" type="text" className="grow bg-transparent" placeholder="Name" />
                    {errorCode == 2 && (
                        <span className="badge badge-error">error</span>
                    )}
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="password" type="password" className="grow bg-transparent" placeholder="Password"/>
                    {errorCode == 3 && (
                        <span className="badge badge-error">not match</span>
                    )}
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input name="re-password" type="password" className="grow bg-transparent" placeholder="Re-password"/>
                    {errorCode == 3 && (
                        <span className="badge badge-error">not match</span>
                    )}
                </label>

                <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" className="checkbox checkbox-primary mr-3" />
                    <span className="label-text">ยอมๆ</span> 
                </label>
                </div>
                <div className="flex flex-col justify-center">
                    <button className="btn btn-primary btn-block my-2">sign up</button>
                    <hr className="m-3"></hr>
                    <span className="text-center">Already have an account?</span>
                    <button className="btn btn-block my-2">sign in</button>
                </div>
               

                </form>
            </div>

        </div>

    );
}

