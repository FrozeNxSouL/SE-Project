"use client"

import { validateName } from "./validation"
import { useState } from "react";

export default function Valid() {
    const [text, setText] = useState("");
    const [err, setErr] = useState("");

    const handle = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setText(e.target.value);
    }

    const check = async ()=> {
        try {
           await validateName(text)
        } catch (e: any) {
            setErr(e.message);
        }
    }

    
    return (
        <div className="ml-10 p-10 flex flex-col">
            <span>{err}</span>
            <input onChange={handle}/>
            <button onClick={check}>test</button>
        </div>
    )
}