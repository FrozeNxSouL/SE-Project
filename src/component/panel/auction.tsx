"use client";

import { useState, useEffect } from 'react';
import { auction } from '../variables';
import { useRouter } from "next/navigation"
import allUpdateData from "@/app/auction/[auctionId]/page";
import { getAuctions, requestAuctions } from '@/app/action/fetch';

export const timeFormater = (item: auction) => {
    let day = stringSpliter(item, 0), range;
    let output: string = ""
    if (day == "Ended") {
        output = "Ended"
    } else {
        for (let i = 0; i < 4; i++) {
            if (stringSpliter(item, i) != "0") {
                switch (i) {
                    case 0:
                        output += stringSpliter(item, 0) + " D "
                    case 1:
                        output += stringSpliter(item, 1) + " H "
                    case 2:
                        output += stringSpliter(item, 2) + " M "
                    case 3:
                        output += stringSpliter(item, 3) + " S "
                    default:
                        break;
                }
                break;
            } else if (i == 3) {
                output = "Ended"
            }
        }
    }
    return output
}

export const calculateTime = (targetTime: number, index: number, auction: auction[]) => {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime

    const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const newAuction: auction[] = [...auction]
    // if (hours <= 0 && timeDifference >= 0) {
    //     newAuction[index].countdown = `${minutes}m ${seconds}s`
    // } else if (days <= 0 && timeDifference >= 0) {
    //     newAuction[index].countdown = `${hours}h ${minutes}m`
    // } else if (days > 0) {
    //     newAuction[index].countdown = `${days}d`
    // } else {
    //     newAuction[index].countdown = "Ended"
    // }
    if (timeDifference >= 0) {
        newAuction[index].countdown = `${days},${hours},${minutes},${seconds}`
    } else {
        newAuction[index].countdown = "Ended"
        // functions.allUpdateData(auction[index].id)
    }
    return newAuction
}

export const stringSpliter = (A: auction, index: number) => {
    const str = A.countdown;
    const delimiter = ',';
    const substrings = str.split(delimiter);

    if ((str == "Ended" && index == 0) || str != "Ended") {
        return substrings[index];
    } else {
        return ;
    }
}

export default function AuctionProducts(props: any) {
    const products = props.data
    const [loading, setLoading] = useState(true);

    const [auction, setAuction] = useState<auction[]>(() => {
        const res: auction[] = [];
        for (let i = 0; i < products.length; i++) {
            res.push({
                id: products[i].product.id,
                title: products[i].product.name,
                image: products[i].product.imageUrl[0],
                price: products[i].currentBid,
                targetTime: products[i].updatedAt,
                countdown: "",
            })
        }
        return res
    })

    const setTime = (targetTime: number, index: number, auction: auction[]) => {
        setAuction(calculateTime(targetTime, index, auction));
    }

    useEffect(() => {
        {
            auction.map((item: auction, index: number) => {
                const countdownInterval = setInterval(() => setTime(new Date(item.targetTime).getTime(), index, auction), 1000);

                return () => {
                    clearInterval(countdownInterval)
                }
            })
        }

    }, [])

    const router = useRouter();

    return (
        <>
            {auction.length != 0 && (
                <div>
                    <div className="divider text-2xl font-bold">Auction</div>
                    <div className="flex justify-center gap-2 flex-wrap my-5">
                        {auction.map((item: auction, index) => (
                            <div onClick={() => router.push(`/auction/${item.id}`)} key={index} className="bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:ring-1 ring-neutral">
                                <div className="absolute m-2 badge badge-neutral font-bold">{`${timeFormater(item)}`}</div>
                                <figure>
                                    <img className="object-cover w-full h-40" src={item.image} alt={item.title} />
                                </figure>
                                <div className="card-body p-5 bg-base-100">
                                    <div className="card-title truncate overflow-hidden max-w-60 font-bold">{item.title}</div>
                                    <div className="card-actions justify-end">
                                        <div>
                                            <p className="font-semibold text-neutral text-xl">฿ {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    )
}
