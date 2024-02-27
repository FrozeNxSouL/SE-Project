"use client";
import Button from "@/component/Button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./ItemContent";

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="
                        text-slate-500 flex items-center gap-1 mt2
                    "
          >
            <MdArrowBack />
            <span>Go shopping!</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-center py-3">Shopping Cart</h1>
      <div
        className="grid
            grid-cols-5
            text-xs
            gap-4
            pb-2
            items-center
            mt-8
            "
      >
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item}/>
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-300 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={() => {}} small outline />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>$1,000</span>
          </div>
          <p className="text-slate-500">Taxes and shipping calculate at checkout</p>
          <Button label="Chekout" onClick={()=>{}}/>
          <Link
            href={"/"}
            className="
                        text-slate-500 flex items-center gap-1 mt2
                    "
          >
            <MdArrowBack />
            <span>Keep shopping!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartClient;
