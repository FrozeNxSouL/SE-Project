"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteUser } from "./fetch";
import { useState } from "react"
import admin from "./page";
interface deleteButtonProps { userid: string, username: string }
interface searchButtonProps { search: string }
interface taxButtonprops { tax: number }

export function Taxchange() {
    const [tax,setTax] = useState<number>(3);
    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const newTax = parseFloat(e.target.value);
        if (!isNaN(newTax)) {
            setTax(newTax);
        }
    }
    return (
        <> <span className="mr-2">Tax : {tax}</span> 
        <label className="input input-bordered input-sm flex items-center gap-2">
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    className="grow bg-transparent" 
                    placeholder="Search" 
                 
                    onChange={(e) => handleTaxChange(e)} // Update tax when input changes
                />
            </form>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
        </label></>
    )
    // return (
    //     <label className="input input-bordered input-sm flex items-center gap-2">
    //         <form onSubmit={(e) => {
    //             // handleSearch(e)
    //         }}>
    //             <input type="text" className="grow bg-transparent" placeholder="Search" />
    //         </form>

    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
    //     </label>
    // )
}

export function SearchButton({ search }: searchButtonProps) {
    const [searchstr, setsearchstr] = useState(search);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams)
        if (searchstr) {
            params.set("search", searchstr)
        } else {
            params.delete("search")
        }
        router.replace(`${pathname}?${params.toString()}`);
    }
    return (
        <label className="input input-bordered input-sm flex items-center gap-2">
            <form onSubmit={(e) => {
                handleSearch(e)
            }}>
                <input type="text" value={searchstr} onChange={(e) => setsearchstr(e.target.value)} className="grow bg-transparent" placeholder="Search" />
            </form>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
    )
}

export function DeleteButton({ userid, username }: deleteButtonProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };

    return (
        <>
            <button onClick={handleToggle} className="btn btn-error text-white rounded-lg">Delete</button>
            <Modal open={showModal}>
                <h3 className="font-bold text-lg">Are you sure to delete user {username} ?</h3>
                <div className="modal-action">
                    <button onClick={() => {
                        deleteUser(userid)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">yes</button>
                    <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>no</button>
                </div>
                {/* <button onClick={() => {
                    deleteUser(userid)
                    handleToggle()
                    router.refresh()
                }} className="btn btn-success text-white rounded-lg mr-4">yes</button>
                <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>no</button> */}
            </Modal>
        </>
    )
}


export function Modal({ children, open }: { children: React.ReactNode, open: boolean }) {
    return (
        <div className={`modal modal-bottom sm:modal-middle ${open && "modal-open"}`}>
            <div className="modal-box">{children}</div>
        </div>
    );
};


