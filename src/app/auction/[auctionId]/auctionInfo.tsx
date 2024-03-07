"use client";

import Button from "@/component/Button";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useEffect, useReducer, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { auctionObject } from "./page";
import ProductCarousel from "@/app/product/[productId]/carousel";
import { auction } from "@/component/variables";
import { calculateTime, stringSpliter } from "@/component/panel/auction";
import CountdownTimer from "@/component/panel/countdown";
import { getUserDetail } from "@/api/action/fetch";


interface auctionProps {
  productDetails: auctionObject;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  img: string[];
  tag: string[];
  time: Date;
  current_bidder: string;
  bidding_amount: String[];
  bidder_id: String[];
  currentBid: number;

};

export default function ProductInfo(props: any) {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { cartTotalQty } = useCart();
  const auctionData = props.data;
  const userData = props.user;
  // console.log(userData);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: auctionData.auction.product.id,
    description: auctionData.auction.product.description,
    img: auctionData.auction.product.imageUrl,
    name: auctionData.auction.product.name,
    tag: auctionData.auction.product.tag,
    time: auctionData.auction.updatedAt,
    bidder_id: auctionData.bidder_id,
    bidding_amount: auctionData.bidding_amount,
    currentBid: auctionData.auction.currentBid,
    current_bidder: userData.name,
  });

  const [auct, setAuction] = useState<auction[]>(() => {
    const res: auction[] = [];
    for (let i = 0; i < 1; i++) {
      res.push({
        id: auctionData.auction.product.id,
        title: auctionData.auction.product.name,
        image: auctionData.auction.product.imageUrl[0],
        price: auctionData.auction.currentBid,
        targetTime: auctionData.auction.updatedAt,
        countdown: "",
      })
    }
    return res
  })

  const setTime = (targetTime: number, index: number, auction: auction[]) => {

    setAuction(calculateTime(targetTime, index, auction))

  }

  useEffect(() => {
    {
      auct.map((item: auction, index: number) => {
        const countdownInterval = setInterval(() => setTime(new Date(item.targetTime).getTime(), index, auct), 1000);

        return () => {
          clearInterval(countdownInterval)
        }
      })
    }

  }, [])

  const router = useRouter()

  return (
    <div className="w-full bg-base-100 flex justify-center flex-row gap-5 px-20 py-10">
      <ProductCarousel data={auctionData.auction.product} />
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <h1 className="text-xl mb-3 text-wrap break-words">
            {cartProduct?.name}
          </h1>
        </div>

        <div className="absolute self-end dropdown dropdown-hover dropdown-left">
          <div tabIndex={0} role="button" className="btn m-1">History</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {cartProduct.bidder_id.map((item, index) => (
              <li key={index}><a>{item} : {cartProduct.bidding_amount[index]}</a></li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <h3 className="w-1/12 font-bold">Tag</h3>
            <div className="flex gap-2">
              {cartProduct.tag.map((item: any, index: number) => (
                <Link className="badge badge-primary" href="/" key={index}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <h3 className="w-1/12 font-bold">Detail</h3>
            <div className="flex gap-2 w-11/12 min-h-20 text-wrap break-words">
              <p className="w-full">{cartProduct.description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-3 gap-3">
          <h2 className="text-2xl">NOW</h2>
          <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl">{cartProduct.currentBid} ฿</h2>
            </div>
          </div>
          <div className="card w-96 bg-primary text-primary-content text-center">
            <p className="text-lg">by {cartProduct.current_bidder}.</p>
          </div>
          <CountdownTimer data={auct} />
        </div>
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-enter gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button label="View Cart" outline onClick={() => {
                router.push('/cart');
              }} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-3 justify-center">
              {/* <Button
                label="Add to cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              /> */}
              <button className="btn btn-wide btn-primary">Take Now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
