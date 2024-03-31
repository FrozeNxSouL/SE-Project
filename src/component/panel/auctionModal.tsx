"use client";

import { getUserandWallet, updateNewBid } from "@/api/action/fetch";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuctionModal(props: any) {
    const [bidInput, setBidInput] = useState(0);
    const [inputError, setInputError] = useState("");
    const { data: session } = useSession()
    const userID = session?.user?.id || "";
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const inputNewValue = () => {
        if (props.data >= bidInput) {
            setInputError("Your Input is Not Enough");
        } else {
            setInputError("");
            updateNewBid(props.product, bidInput, userID);
            closeModal();
            router.refresh();

        }
    }

    return (
        <>
            <button className="btn btn-wide btn-primary" onClick={openModal}>Take Now</button>
            {isModalOpen && (
            <dialog id="my_modal_2" className="modal" open>
                <div className="modal-box">
                    <form action={inputNewValue}>
                        <h3 className="font-bold text-xl text-center">Bidding</h3>
                        <div className="flex flex-row w-full py-4">
                            <h4 className="font-bold text-lg w-1/2">Current Bid</h4>
                            <h4 className="font-bold text-lg w-1/2 text-center">{props.data}</h4>
                            {/* <kbd className="kbd kbd-sm">฿</kbd> */}
                        </div>
                        <div className="flex flex-row w-full py-4">
                            <h4 className="font-bold text-lg w-1/2">Your Bid</h4>

                            <input required type="number" step={0.5} className="grow bg-transparent text-center text-lg w-1/2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBidInput(parseFloat(e.target.value))} />

                        </div>
                        <div className="py-4 h-10">
                            <p className="text-red-500">{inputError}</p>
                        </div>
                        <div className="flex justify-center py-4">
                            <button className="btn btn-wide btn-primary" type="submit">Confirm</button>
                        </div>
                    </form>
                </div>
                <form action={closeModal} className="bg-black opacity-50 modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            )}
        </>
    )
}
