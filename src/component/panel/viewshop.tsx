"use client"

import SellerPage from "@/app/sellerStore/[sellerID]/page"
import { useRouter } from "next/navigation";


export default function Viewshop(props : any) {
    const router = useRouter()

    const handleButton = () => {
        router.push(`/sellerStore/${props.data}`)
    }

    return (
        <>
            <button className="btn btn-outline btn-sm btn-primary" onClick={handleButton} >View Shop</button>
        </>
    )
}
