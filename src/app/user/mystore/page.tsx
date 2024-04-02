import { getCurrentSession } from "@/lib/getCurrentSession";
import prisma from "@/lib/prismaDB";
import Link from "next/link";
import {  EditButton } from "./mystoreFunction";

export default async function Address() {
    const session = await getCurrentSession();
    const product = await prisma?.product.findMany({
        where: {
            userId: session?.user?.id,
        }
    })

    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5 gap-2">
            <div className="divider text-2xl font-bold">My Store</div>
            <div className="flex justify-center w-full">
                <Link className="btn btn-primary w-1/5" href="/add-product">Create Product</Link>
            </div>
            <div className="w-full grid grid-cols-4 justify-items-center gap-y-5">
                    {product.map((item, index)=> (
                        <div key={index} className="bg-base-100 shadow-xl basis-60 transition cursor-pointer hover:ring-1 ring-primary w-56">
                            <EditButton data={item} />
                            <figure>
                                <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                            </figure>
                            <div className="card-body p-5 bg-base-100">
                                <div className="flex flex-wrap gap-2">
                                    {item.tag.map((t, idx)=> (
                                        <div key={idx} className="badge badge-outline">{t}</div>
                                    ))}
                                    
                                </div>
                                <div className="card-title truncate overflow-hidden max-w-60 font-bold">{item.name}</div>
                                <div className="card-actions justify-between">
                                    <div className="w-full">
                                        <p className="font-semibold text-primary text-xl text-right">฿ {item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}