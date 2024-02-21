"use client"
import { useRouter } from "next/navigation";
import { deleteUser } from "./fetch";
import { useState } from "react"

interface deleteButtonProps { userid: string, username: string }
export function DeleteButton({ userid, username }: deleteButtonProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter()
    const handleToggle = () => {
        setShowModal((prev) => !prev)
    };

    return (
        // <button onClick={() => {
        //     deleteUser(userid)
        //     router.refresh()
        // }} className="btn btn-error text-white rounded-lg">Delete</button>
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


