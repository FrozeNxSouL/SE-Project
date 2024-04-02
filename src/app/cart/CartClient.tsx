"use client";
import Button from "@/component/Button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getManage } from "../admin/fetch";
import { useEffect, useState } from "react";

const CartClient = () => {
  const { data: session } = useSession();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const [tax, setTax] = useState<number | null>(null);

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const managementData = await getManage();
        if (managementData?.tax != null) {
          setTax(managementData.tax);
        } else {
          console.error("Management data or tax value is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching tax:", error);
      }
    };

    fetchTax();
  }, []);
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="material-icons opacity-50 !text-9xl">production_quantity_limits</span>
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
      <div className="divider divide-primary font-bold text-center p-5 text-xl">Shopping Cart</div>
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
        <div className="col-span-2 justify-self-end">PRICE</div>
        <div className="justify-self-end">Remove</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item:any) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-300 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            {tax != null && <span>{formatPrice(cartTotalAmount*tax + cartTotalAmount)}</span>}
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          <Button
            label={session?.user ? "Checkout" : "Login To Checkout"}
            outline={session?.user ? false : true}
            onClick={() => {
              session?.user
                ? router.push("/checkout")
                : router.push("/auth/login");
            }}
          />
          <Link href={"/"} className="text-info flex items-center gap-1 mt2">
            <span className="material-icons">arrow_back</span>
            <span>Keep shopping!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartClient;
