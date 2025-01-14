import ProductInfo from "./productInfo";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/app/action/fetch";
import { webName } from "@/component/variables";
import Viewshop from "@/component/panel/viewshop";



export default async function product({ params }: { params: { productId: string } }) {
    const res = await getProductDetail(params.productId);
    if (!res) {
        notFound();
    }
    const productDetails = res?.productDetails;
    const seller = res?.seller;
    if (!productDetails || !seller) {
        notFound();
    }

    return (
        <div className="max-w-screen-xl mx-auto" >
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>{webName}</a></li>
                    <li><a href="">{productDetails?.tag[0]} </a></li>
                    <li>{productDetails?.name}</li>
                </ul>
            </div>
            <ProductInfo productDetails={productDetails} />
            <div className="bg-base-100 w-full mt-5 p-5 flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img src={productDetails.User?.picture} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-lg">{productDetails.User?.name}</h1>
                        <span className="opacity-80 font-light">
                            {productDetails.User?.phone || "-"}
                        </span>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="flex flex-col justify-center">
                        <p><span className="font-bold">Tel. </span> {productDetails.User?.phone || "-"}</p>
                        <p><span className="font-bold">Email </span> {productDetails.User?.email || "-"} </p>
                        {/* <p>Score {productDetails.User?.score}</p> */}
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <Viewshop data={productDetails.User?.id}/>
                </div>

            </div>
        </div>
    )
}