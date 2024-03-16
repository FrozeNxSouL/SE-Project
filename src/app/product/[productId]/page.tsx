import ProductInfo from "./productInfo";
import { productDetails, userData } from "@/component/variables";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/api/action/fetch";
import prisma from "@/lib/prismaDB";



export default async function product({ params }: { params: { productId: string } }) {
    const res = await getProductDetail(params.productId);
    const productDetails = res?.productDetails;
    const seller = res?.seller;
    if (!productDetails || !seller) {
        notFound();
    }

    return (
        <div className="max-w-screen-xl mx-auto" >
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>Nitid</a></li>
                    <li><a href="">{productDetails?.tag[0]} </a></li>
                    <li>{productDetails?.name}</li>
                </ul>
            </div>
            <ProductInfo productDetails={productDetails} />
            <div className="bg-base-100 w-full mt-5 p-5 flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={seller.picture} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold">{seller.name}</h1>
                        <span className="opacity-80 font-light">
                            {seller.phone}
                        </span>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div>
                        <p>selled 8 products {params.productId}</p>
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