"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { changeTax, deleteUser, editTag, tagAdd } from "./fetch";
import { useState } from "react"
import admin from "./page";
interface deleteButtonProps { userid: string, username: string }
interface editTagProps { index: number, categoryHandle: JSON | null }
interface searchButtonProps { search: string }
interface managechangeProps { taxhandle: number | undefined, categoryhandle: JSON | null }


export function Taxchange({ taxhandle, categoryhandle }: managechangeProps) {
    const [tax, setTax] = useState<number | undefined>(taxhandle);
    const [category, setCategory] = useState<JSON | null>(categoryhandle);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()

    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTax = parseFloat(e.target.value);
        setTax(newTax);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = JSON.parse(e.target.value);
        setCategory(newCategory);
    }

    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };

    // return (
    //     <>
    //         <label className="input input-bordered input-sm flex items-center gap-2">
    //             <form onSubmit={(e) => {
    //                 changeTax(tax)
    //                 router.refresh()
    //             }}>
    //                 <input
    //                     type="number"
    //                     className="grow bg-transparent"
    //                     onChange={(e) => handleTaxChange(e)} // Update tax when input changes
    //                 />
    //             </form>
    //         </label></>
    // )

    return (
        <>
            <button onClick={handleToggle} className="btn btn-error text-white rounded-lg">Edit</button>
            <Modal open={showModal}>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">tax :</span>
                    </div>
                    <label className="input input-bordered input-sm items-center gap-2">
                        <input type="number" value={tax} className="grow bg-transparent" onChange={(e) => handleTaxChange(e)} />
                    </label>
                </div>

                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">category :</span>
                    </div>
                    <label className="input input-bordered input-sm items-center gap-2">
                        <input type="text" value={JSON.stringify(category)} className="grow bg-transparent" onChange={(e) => handleCategoryChange(e)} />
                    </label>
                </div>

                <div className="modal-action">
                    <button onClick={() => {
                        changeTax(tax, category)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                    <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>Cancel</button>
                </div>
            </Modal>
        </>
    )
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
            <button onClick={handleToggle} className="btn btn-error ">
                <span className="material-icons-outlined">delete_forever</span>
            </button>
            <Modal open={showModal}>
                <h3 className="font-bold text-lg">Are you sure to delete user {username} ?</h3>
                <div className="modal-action">
                    <button onClick={() => {
                        deleteUser(userid)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                    <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>Cancel</button>
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

export function AddTag() {
    const [url, setUrl] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };
    const createname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTax = e.target.value;
        setName(newTax);
    }
    const createurl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = e.target.value;
        setUrl(newCategory);
    }
    const setdefault =()=>{
        setUrl("")
        setName("")
    }
    return (
        <>
            <button onClick={handleToggle} className="btn btn-success">
                <span className="material-icons">add</span>
            </button>
            <Modal open={showModal}>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Name :</span>
                    </div>
                    <label className="input input-bordered input-sm items-center gap-2">
                        <input type="text" value={name} className="grow bg-transparent" onChange={(e) => createname(e)} />
                    </label>
                </div>

                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Url :</span>
                    </div>
                    <label className="input input-bordered input-sm items-center gap-2">
                        <input type="text" value={url} className="grow bg-transparent" onChange={(e) => createurl(e)} />
                    </label>
                </div>

                <div className="modal-action">
                    <button onClick={() => {
                        tagAdd(name,url)
                        setdefault()
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                    <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export function EditTag({ index, categoryHandle }: editTagProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [category, setCategory] = useState<JSON | null>(categoryHandle)

    const [name, setName] = useState(categoryHandle[index].name)
    const [url, setUrl] = useState(categoryHandle[index].url)

    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    const handleSubmit = (index: number) => {
        const newCategory = category
        newCategory[index].name = name
        newCategory[index].url = url
        editTag(newCategory)
    }


    return (
        <>
            <button key={index} onClick={handleToggle} className="btn btn-primary btn-outline">
                {categoryHandle[index].name}
            </button>
            <Modal open={showModal}>
                <div className="modal-top mb-5">
                    <h3 className="font-bold text-lg">Edit</h3>
                </div>
                <div className="modal-middle space-y-2">
                    <label className="input input-bordered flex items-center gap-2">
                        Label
                        <input type="text" className="grow bg-transparent" value={categoryHandle[index].name} onChange={(e) => handleChangeName(e)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        URL
                        <input type="text" className="grow bg-transparent" value={categoryHandle[index].url} onChange={(e) => handleChangeUrl(e)} />
                    </label>
                </div>
                <div className="modal-action">
                    <button onClick={() => {
                        handleSubmit(index)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                    <button className="btn btn-error text-white rounded-lg" onClick={handleToggle}>Cancel</button>
                </div>
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


