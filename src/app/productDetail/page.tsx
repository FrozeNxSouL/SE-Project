import ProductInfo from "./productInfo";
import prisma from "@/lib/prismaDB";
import { userData } from "@/component/variables";

export default async function payment() {
    const productDetails = await prisma.product.findFirst();
    return (
    <div className="max-w-screen-xl mx-auto">
        <div className="text-sm breadcrumbs">
            <ul>
                <li><a>Nitid</a></li> 
                <li><a href="">{productDetails?.tag[0]} </a></li> 
                <li>{productDetails?.name}</li>
            </ul>
        </div>
        <ProductInfo data={productDetails} />
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
                    <p>selled 8 products</p>
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