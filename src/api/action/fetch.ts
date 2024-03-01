"use server"
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation"

export async function getAuctionProductbyTag(tagInput: string) {
    try {
        const output = await prisma.auction.findMany({
            include: {
                product: true
            },
            where: {
                AND: [
                    {
                        product: {
                            tag: {
                                hasSome: [tagInput]
                            }
                        },
                    }
                ],
            },
            // take: 3,
            orderBy: {
                id: 'desc'
            }
        });
        if (!output) {
            notFound();
        }
        console.log(output)
        return output;
    } catch (error) {
        console.log(error);
        notFound()
    }
}

export async function getProductbyTag(tagInput: string) {
    try {
        const output = await prisma.product.findMany({
            where: {
                AND: [
                    {
                        tag: {
                            hasSome: [tagInput]
                        }
                    },
                    { status: "sell" },
                ],
            }
        });
        console.log(output)
        if (!output) {
            notFound();
        }
        return output;
    } catch (error) {
        console.log(error);
        notFound()
    }
}

export async function getAuctionProduct() {
    const products = await prisma.auction.findMany({
        take: 3,
        include: {
            product: true
        },
        where: {
            product : {
                status: "auction"
            },
        },
        orderBy: {
            id: 'desc'
        }
    })
    return products
}

export async function getProducts() {
    const products = await prisma.product.findMany({
        take: 6,
        where: {
            status: "sell",
        },
        orderBy: {
            id: 'desc'
        }
    })
    return products
}
