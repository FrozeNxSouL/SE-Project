"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function SearchBox() {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        router.push(`/search?keyword=${keyword}`)
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setKeyword(e.target.value);
    }
    return (
        <form className="w-full" onSubmit={handleSearchSubmit}>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <input onChange={handleSearchChange} type="text" className="grow bg-transparent" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
        </form>
    )
}