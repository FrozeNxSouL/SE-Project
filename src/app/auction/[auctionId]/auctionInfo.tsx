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
import AuctionModal from "@/component/panel/auctionModal";

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
  const router = useRouter();

  const { handleAddProductToCart, cartProducts } = useCart();
  const [isExpired, setIsExpired] = useState(false);
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

  const [auctionProduct, setAuction] = useState<auction[]>(() => {
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
      auctionProduct.map((item: auction, index: number) => {
        const countdownInterval = setInterval(() => setTime(new Date(item.targetTime).getTime(), index, auctionProduct), 1000);
        return () => {
          clearInterval(countdownInterval)
        }
      })
    }
  }, [auctionProduct])

  return (
    <div className="w-full bg-base-100 flex justify-center flex-row gap-5 px-20 py-10">
      <ProductCarousel data={auctionData.auction.product} />
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <h1 className="text-xl mb-3 text-wrap break-words">
            {cartProduct?.name}
          </h1>
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
          <div className=" flex justify-center items-center h-32 w-96 rounded-3xl bg-neutral text-neutral-content">
            <h2 className="absolute self-auto mr-72 mb-20 text-md badge badge-outline">NOW</h2>
            <h2 className="font-mono text-6xl text-primary">{auctionData.auction.currentBid} ฿</h2>
          </div>

          <div className="dropdown dropdown-hover dropdown-bottom">
            <div tabIndex={0} role="button" className="btn rounded-3xl bg-primary w-96">
              <p className="text-white text-lg">by {cartProduct.current_bidder}.</p>
            </div>
          </div>
          <CountdownTimer data={auctionProduct} isExpired={isExpired} setIsExpired={setIsExpired} />
        </div>
        {isExpired ? (
          <>
            <div className="flex flex-row gap-3 justify-center">
              <button className="btn btn-wide btn-outline">Expired</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-3 justify-center">
              <AuctionModal data={auctionData.auction.currentBid} product={auctionData.auction.product.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
