import ProductInfo from "./auctionInfo";
import { notFound } from "next/navigation";
import { getAuctionDetail, getUserDetail, updateExpiredStatus } from "@/api/action/fetch";
import { webName } from "@/component/variables";
import Viewshop from "@/component/panel/viewshop";

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
interface FunctionIndexSignature {
    [x: string]: (productId: string) => Promise<void>;
}

const functions: FunctionIndexSignature = {
    allUpdateData: async (productId: string) => {
        await updateExpiredStatus(productId);
    },
};

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
                    <li><a>{webName}</a></li>
                    <li><a href="">{output?.auction.product.tag[0]} </a></li>
                    <li>{output?.auction.product.name}</li>
                </ul>
            </div>
            <ProductInfo data={output} user={user} />
            <div className="bg-base-100 w-full mt-5 p-5 flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={output.auction.product.User?.picture} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-lg">{output.auction.product.User?.name}</h1>
                        <span className="opacity-80 font-light">
                            {output.auction.product.User?.phone}
                        </span>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div>
                        <p>call with {output.auction.product.User?.phone}</p>
                        <p>joined for {output.auction.product.User?.email} </p>
                        <p>score {output.auction.product.User?.score}</p>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <Viewshop data={output.auction.product.User?.id}/>
                </div>
            </div>
        </div>
    )
}