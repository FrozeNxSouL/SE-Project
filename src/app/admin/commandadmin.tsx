"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { changeTax, deleteProduct, deleteTag, deleteUser, editTag, statusReport, tagAdd } from "./fetch";
import { useEffect, useState } from "react"
import admin from "./page";
interface deleteButtonProps { userid: string, username: string, props: any, product: any }
interface editTagProps { catid: string, catname: string, caturl: string }
interface addtagProps { adminid: string }
interface searchButtonProps { search: string }
interface managechangeProps { taxhandle: number }

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

    return (
        <>
            <div className="flex justify-center">
                <button onClick={handleToggle} className="btn btn-warning text-white rounded-lg w-1/12">Edit</button>
            </div>
            <Modal open={showModal}>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Tax :</span>
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
        e.preventDefault();

        if (searchParams !== null) {
            const params = new URLSearchParams(searchParams);

            if (searchstr) {
                params.set("search", searchstr);
            } else {
                params.delete("search");
            }

            router.replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <label className="input input-bordered input-sm flex items-center gap-2">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchstr}
                    onChange={(e) => setsearchstr(e.target.value)}
                    className="grow bg-transparent"
                    placeholder="Search"
                />
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
        </label>
    );
}

export function DeleteButton({ userid, username, props, product }: deleteButtonProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };
    const del = (userid: string, props: any, product: any) => {
        deleteUser(userid)
        props.map((rep: any, index: any) => (
            statusReport(rep.id)
        ))
        product.map((rep: any, index: any) => (
            deleteProduct(rep.id)
        ))
    }
    return (
        <>
            <button onClick={handleToggle} className="btn btn-error ">
                <span className="material-icons-outlined">delete_forever</span>
            </button>
            <Modal open={showModal}>
                <h3 className="font-bold text-lg">Are you sure to delete user {username} ?</h3>
                <div className="modal-action">
                    <button onClick={() => {
                        del(userid, props, product)
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };

    const readreport = (read: any) => {
        {
            read.map((rep: any, index: any) => (
                statusReport(rep.id)
            ))
        }
    }
    return (
        <>
            <button onClick={handleToggle} className="btn btn-accent btn-xs">
                details
            </button>
            <Modal open={showModal} >
                <button className="absolute top-2 right-5 text-gray-500 text-[30px]" onClick={handleToggle}>x</button>

                {props.data.map((rep: any, index: any) => (
                    <div key={index} className="mb-10 mt-5">
                        {/* {rep.reportStatus === "1" && (  */}
                        <div className="flex flex-col size-full my-5 p-5 bg-gray-100">
                            <h3 className="font-bold text-xl">From: {rep.reportingUserID}</h3>
                            {rep.reportSelection.map((sec: string, index2: number) => (
                                <div key={index2}>
                                    <h3 className="font-sans font-semibold text-lg">• {sec}</h3>
                                </div>
                            ))}
                            <div className="my-3 p-10 flex flex-row overflow-x-scroll">
                                {rep.reportPicture.map((sec: string, index3: number) => (
                                    <img key={index3} src={sec} alt={`Report Picture ${index3}`} className="object-cover min-w-full h-72" />
                                ))}
                            </div>
                            <h3 className="font-bold text-lg my-2">Description</h3>
                            <div className="w-full min-h-32 bg-gray-200 text-wrap p-5">
                                <h4>{rep.reportDescription}</h4>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="divider divider-primary"></div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                ))}
                <div className="modal-action">
                    <button onClick={() => {
                        readreport(props.data)
                        handleToggle();
                        router.refresh();
                    }} className="btn btn-error text-white rounded-lg mr-4">Done</button>
                </div>
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
            <button onClick={handleToggle} className="btn btn-accent">
                <span className="material-icons">add</span>
            </button>
            <Modal open={showModal}>

                <div className="modal-top mb-5">
                    <h3 className="font-bold text-lg">New Category</h3>
                    <button className="absolute top-2 right-5 text-gray-500 text-[25px]" onClick={handleToggle}>x</button>
                </div>
                <div className="modal-middle space-y-2">
                    <label className="input input-bordered flex items-center gap-2">
                        Label :
                        <input type="text" className="grow bg-transparent" value={name} onChange={(e) => createname(e)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        URL :
                        <input type="text" className="grow bg-transparent" value={url} onChange={(e) => createurl(e)} />
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
            <button onClick={handleToggle} className="btn btn-accent btn-outline">
                {catname}
            </button>
            <Modal open={showModal}>
                <div className="modal-top mb-5">
                    <h3 className="font-bold text-lg">Edit</h3>
                    <button className="absolute top-2 right-5 text-gray-500 text-[25px]" onClick={handleToggle}>x</button>
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
                    <button onClick={() => {
                        deleteTag(catid)
                        handleToggle()
                        router.refresh()
                    }} className="btn btn-error text-white rounded-lg mr-4">Delete</button>
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
}

