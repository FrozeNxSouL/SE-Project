'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const CartCount = () => {
    const {cartTotalQty} = useCart();
    const router = useRouter();
    return(
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div className="text-3xl">
                <span className="material-icons">shopping_cart</span>
            </div>
            <div className="badge badge-primary absolute -top-2 -right-5 z-50">{cartTotalQty}</div>
        </div>
    );
}
export default CartCount;