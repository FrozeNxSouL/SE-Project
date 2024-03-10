"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { changeTax, deleteTag, deleteUser, editTag, tagAdd } from "./fetch";
import { useEffect, useState } from "react"
import admin from "./page";
interface deleteButtonProps { userid: string, username: string }
interface editTagProps { catid: string, catname: string, caturl: string }
interface addtagProps { adminid: string }
interface searchButtonProps { search: string }
interface managechangeProps { taxhandle: number }
interface reportdetailProps { userid: string }


export function Taxchange({ taxhandle }: managechangeProps) {
    const [tax, setTax] = useState<number>(taxhandle);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()

    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTax = parseFloat(e.target.value);
        setTax(newTax);
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
            <div className="flex justify-end">
                <button onClick={handleToggle} className="btn btn-error text-white rounded-lg mr-8">Edit</button>
            </div>
            <Modal open={showModal}>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">tax :</span>
                    </div>
                    <label className="input input-bordered input-sm items-center gap-2">
                        <input type="number" value={tax} className="grow bg-transparent" onChange={(e) => handleTaxChange(e)} />
                    </label>
                </div>

                <div className="modal-action">
                    <button onClick={() => {
                        changeTax(tax)
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
            </Modal>
        </>
    )
}

export function DeatailReport(props: any) {
    // export function DeatailReport({userid}: reportdetailProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    // const userreport = getReport(userid)
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };
    console.log(props.data)
    return (
        <>
            <button onClick={handleToggle} className="btn btn-ghost btn-xs">
                details
            </button>

            <Modal open={showModal}>

                <button className="absolute top-2 right-5 text-gray-500 " onClick={handleToggle}>X</button>
                {props.data.map((rep: any, index: any) => (
                    <div key={index} className="mb-5 mt-5">
                        {/* {rep.reportStatus === "1" && (  */}
                        <>
                            <h3 className="font-bold text-lg">From: {rep.reportingUserID}</h3>
                            {rep.reportSelection.map((sec: any, index2: any) => (
                                <div key={index2}>
                                    <h3 className="font-bold text-lg">{sec}</h3>
                                </div>
                            ))}
                            <div className="modal-action">
                                <button onClick={() => {
                                    handleToggle();
                                    router.refresh();
                                }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                            </div>
                        </>
                        {/* )} */}
                    </div>
                ))}
            </Modal>
        </>
    )
}

export function AddTag({ adminid }: addtagProps) {
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
    const setdefault = () => {
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
                        tagAdd(name, url, adminid)
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

export function EditTag({ catid, catname, caturl }: editTagProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState(catname)
    const [url, setUrl] = useState(caturl)
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

    return (
        <>
            <button onClick={handleToggle} className="btn btn-primary btn-outline">
                {catname}
            </button>
            <Modal open={showModal}>
                <div className="modal-top mb-5">
                    <h3 className="font-bold text-lg">Edit</h3>
                </div>
                <div className="modal-middle space-y-2">
                    <label className="input input-bordered flex items-center gap-2">
                        Label :
                        <input type="text" className="grow bg-transparent" value={name} onChange={(e) => handleChangeName(e)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        URL :
                        <input type="text" className="grow bg-transparent" value={url} onChange={(e) => handleChangeUrl(e)} />
                    </label>
                </div>
                <div className="modal-action">
                    <button onClick={() => {
                        editTag(catid, name, url)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Confirm</button>
                    <button className="btn btn-error text-white rounded-lg mr-4" onClick={handleToggle}>Cancel</button>
                    <button onClick={() => {
                        deleteTag(catid)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-success text-white rounded-lg mr-4">Delete</button>
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

