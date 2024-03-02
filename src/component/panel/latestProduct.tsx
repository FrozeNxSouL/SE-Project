"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LatestProducts(props: any) {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col justify-center" >
                <div className='flex flex-wrap justify-center'>
                    {props.data.map((item: any, idx: number) => (
                        // <Link href={`/product/${item.id}`}>
                        <div onClick={() => router.push(`/product/${item.id}`)} className="bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:ring-1 ring-primary" key={idx}>
                            <figure>
                                <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                            </figure>
                            <div className="card-body p-5 bg-base-100">
                                <div className="flex flex-wrap gap-2">
                                    <div className="badge badge-primary">NEW</div>
                                    {item.tag.map((element: string, i: number) => {
                                        <div className="badge badge-outline" key={i}>{element}</div>
                                    })}

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
    )
}