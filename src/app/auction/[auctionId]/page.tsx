import ProductInfo from "./auctionInfo";
import prisma from "@/lib/prismaDB";
import { productDetails, userData } from "@/component/variables";
import { notFound } from "next/navigation";
import { getAuctionDetail, getUserDetail, updateExpiredStatus } from "@/api/action/fetch";

export interface auctionObject {
    id: string;
    description: string;
    imageUrl: string[];
    name: string;
    price: number;
    tag: string[];
    updatedAt: Date;
    bidding_amount: String[];
    bidder_id: String[];
    currentBid: number;
}
export async function callUpdateData(productId : string){
    await updateExpiredStatus(productId);
}

export default async function payment({ params }: { params: { auctionId: string } }) {
    const output = await getAuctionDetail(params.auctionId);
    const user = await getUserDetail(output?.auction.bidderId || "");
    if (!output) {
        notFound();
    }
    return (
        <div className="max-w-screen-xl mx-auto" >
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>Nitid</a></li>
                    <li><a href="">{output?.auction.product.tag[0]} </a></li>
                    <li>{output?.auction.product.name}</li>
                </ul>
            </div>
            <ProductInfo data={output} user={user} />
            <div className="bg-base-100 w-full mt-5 p-5 flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={userData.image} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold">{userData.username}</h1>
                        <span className="opacity-80 font-light">
                            {userData.tel}
                        </span>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div>
                        <p>selled 8 products {params.auctionId}</p>
                        <p>joined for 8 sec</p>
                        <p>score 1.2</p>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <button className="btn btn-sm btn-error btn-outline">Report</button>
                    <button className="btn btn-outline btn-sm btn-primary">View Shop</button>
                </div>

            </div>
        </div>
    )
}