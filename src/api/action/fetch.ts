"use server"
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation"

export async function getAuctionProductbyTag(tagInput: string) {
    try {
        const output = await prisma.product.findMany({
            include : {
                auction : true
            },
            where: {
                AND: [
                    {
                        tag: {
                            hasSome: [tagInput]
                        }
                    },
                    { status: "auction" },
                ],
            },
            // take: 3,
            orderBy: {
                id: 'desc'
            }
        });
        // console.log(output)
        if (!output) {
            notFound();
        }
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
        console.log(tagInput)
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
    const products = await prisma.product.findMany({
        take: 3,
        include : {
            auction : true
        },
        where: {
            status: "auction",
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
