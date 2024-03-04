"use client"
import { Product } from "@prisma/client"

export default function Listings(props: any) {
    const products: Product[] = props.data
    return(
        <div className="flex flex-wrap justify-center">
            {products.map((item, index)=> (
            <div key={index} className="bg-base-100 shadow-xl basis-60 m-2 transition cursor-pointer hover:ring-1 ring-primary">
                <figure>
                    <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                </figure>
                <div className="card-body p-5 bg-base-100">
                    <div className="flex flex-wrap gap-2">
                        {item.tag.map((t, idx)=> (
                            <div key={idx} className="badge badge-outline">{t}</div>
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
    )
}