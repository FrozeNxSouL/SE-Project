"use client"
import { getProductbyTag, getProducts, requestProducts } from "@/api/action/fetch";
import { Product } from "@prisma/client";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function LatestProducts(props: any) {
    const router = useRouter();

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const request:requestProducts = {
        quantity:6,
        tag:[props.data],
        keyword:props.data,
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProducts(request)
                const newData = response.list.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    tag: item.tag,
                    status: item.status,
                    auction: null,
                    Transaction: null,
                    transactionId: null,
                    User: null,
                    userId: null,
                }));
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            {data.length > 0 && (
                <>
                    <div className="flex flex-col w-1/3 lg:flex-row m-12">
                        <div className="grid flex-grow h-16 card bg-primary rounded-box place-items-center">Category</div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="grid flex-grow h-16 card rounded-box place-items-center border-white border-2">{props.data}</div>
                    </div>
                    <div className="flex flex-col justify-center" >
                        <div className='flex flex-wrap justify-center'>
                            {data.map((item: any, idx: number) => (
                                // <Link href={`/product/${item.id}`}>
                                <div onClick={() => router.push(`/product/${item.id}`)} className="bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:ring-1 ring-primary" key={idx}>
                                    <figure>
                                        <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                                    </figure>
                                    <div className="card-body p-5 bg-base-100">
                                        <div className="flex flex-wrap gap-2">
                                            {/* <div className="badge badge-primary">NEW</div> */}
                                            {item.tag.slice().reverse().map((element: string, i: number) => (
                                                <div className="badge badge-outline" key={i}>{element}</div>
                                            ))}
                                        </div>
                                        <div className="card-title truncate overflow-hidden max-w-60">{item.name}</div>
                                        <div className="card-actions justify-end">
                                            <div>
                                                <p className="text-primary text-xl">฿ {item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/shop" className="btn btn-primary m-10">View more</Link>
                    </div>
                </>
            )}
        </>
    )
}