"use client"

import ProductCarousel from "./carousel"
import Link from "next/link";

export default function ProductInfo(props: any) {
    const productDetails = props.data;
    return (
        <div className="w-full bg-base-100 flex justify-center flex-row gap-5 px-20 py-10">
            <ProductCarousel data={productDetails} />
            <div className="flex flex-col justify-between w-2/3">
                <div>
                    <h1 className="text-xl mb-3 text-wrap break-words">{productDetails?.name}</h1>
                    <div className="bg-base-200 p-3">
                        <h2 className="text-2xl text-primary">฿{productDetails.price}</h2>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-2">
                        <h3 className="w-1/12 font-bold">Tag</h3>
                        <div className="flex gap-2">
                            {productDetails.tag.map((item: any, index: number)=> (
                                <Link className="badge badge-primary" href="/" key={index}>{item}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <h3 className="w-1/12 font-bold">Detail</h3>
                        <div className="flex gap-2 w-11/12 min-h-40 text-wrap break-words">
                        <p className="w-full">{productDetails.detail}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <button className="btn btn-wide btn-outline btn-primary">Add To Cart</button>
                    <button className="btn btn-wide btn-primary">Buy Now</button>
                </div>

            </div>
        </div>
    )
}