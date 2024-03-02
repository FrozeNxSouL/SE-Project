"use client";
import { useState, useEffect } from 'react';

interface auction {
    title: string,
    image: string,
    price: number,
    targetTime: string,
    countdown: string
}

export default function AuctionProducts(props: any) {
    const products = props.data
    const [auction, setAuction] = useState<auction[]>(()=> {
        const res: auction[] = [];
        for (let i = 0; i < products.length; i++) {
            res.push({
                title: products[i].product.name,
                image: products[i].product.imageUrl[0],
                price: products[i].currentBid,
                targetTime: products[i].updatedAt,
                countdown: "",
            })
        }
        return res
    })

    const calculateTime = (targetTime: number, index: number)=> {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const newAuction: auction[] = [...auction]
        if (hours <= 0) {
            newAuction[index].countdown = `${minutes}m ${seconds}s`
        } else if (days <= 0){
            newAuction[index].countdown = `${hours}h ${minutes}m`
        } else {
            newAuction[index].countdown = "Ended"
        }
        setAuction(newAuction)
        
    }

    useEffect(()=> {
        {auction.map((item: auction, index: number)=> {
            const countdownInterval = setInterval(()=> calculateTime(new Date(item.targetTime).getTime(), index), 1000);

            return ()=> {
                clearInterval(countdownInterval)
            }
        })}
        
    }, [])

    return (
        <div className="flex justify-center gap-2 flex-wrap">
            {auction.map((item: auction, index)=> (
                <div key={index} className="bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:ring-1 ring-primary">
                    <div className="absolute m-2 badge badge-primary font-bold">{item.countdown}</div>
                    <figure>
                        <img className="object-cover w-full h-40" src={item.image} alt={item.title} />
                    </figure>
                    <div className="card-body p-5 bg-base-100">
                        <div className="card-title truncate overflow-hidden max-w-60">{item.title}</div>
                        <div className="card-actions justify-end">
                            <div>
                                <p className="text-primary text-xl">฿ {item.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
