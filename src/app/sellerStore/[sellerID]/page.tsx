
import { productFromSeller } from "@/api/action/fetch";
import { notFound } from "next/navigation";

interface IParams {
    sellerID: string;
}

export default async function SellerPage({ params }: { params: IParams }) {

    const output = await productFromSeller(params.sellerID);
    if (!output) {
        notFound();
    }
    return (
        <div className="flex flex-row justify-evenly bg-base-200 max-w-screen-xl mx-auto min-h-screen gap-2">
            <div className="bg-base-100 w-1/5 min-h-full mt-5 p-5 flex flex-row justify-between">
                <div className="flex flex-col items-center w-full gap-5">
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-4xl">{output.user?.name}</h1>
                    </div>
                    <div className="avatar">
                        <div className="size-40 rounded-full">
                            <img src={output.user?.picture} />
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="text-center">
                        <p>Tel : {output.user?.phone}</p>
                        <p>score : {output.user?.score}</p>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                </div>
            </div>
            <div className="min-h-full">
                <div className="divider text-2xl font-bold">{output.user?.name} Store</div>
                <div className="w-full grid grid-cols-4 justify-items-center gap-5">
                    {output.product.map((item: any, index: number) => (
                        <>
                            {item.status == "sell" ? (
                                <div key={index} className="bg-base-100 shadow-xl basis-60 transition cursor-pointer hover:ring-1 ring-primary w-56">
                                    <figure>
                                    <div className="absolute badge m-2 badge-primary">{item.status}</div>
                                        <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                                    </figure>
                                    <div className="card-body p-5 bg-base-100">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tag.map((t:string, idx:number) => (
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
                            ) : (
                                <div key={index} className="bg-base-100 shadow-xl basis-60 transition cursor-pointer hover:ring-1 ring-neutral w-56">
                                    <figure>
                                    <div className="absolute badge m-2 badge-neutral">{item.status}</div>
                                        <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                                    </figure>
                                    <div className="card-body p-5 bg-base-100">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tag.map((t:string, idx:number) => (
                                                <div key={idx} className="badge badge-outline">{t}</div>
                                            ))}

                                        </div>
                                        <div className="card-title truncate overflow-hidden max-w-60 font-bold">{item.name}</div>
                                        <div className="card-actions justify-between">
                                            <div className="w-full">
                                                <p className="font-semibold text-neutral text-xl text-right">฿ {item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}