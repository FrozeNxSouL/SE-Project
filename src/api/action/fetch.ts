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
            product: {
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

export async function getProductDetail(productId: string) {
    try {
        const productDetails = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        });
        if (!productDetails) {
            return null
        }
        return productDetails;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getAuctionDetail(productId: string) {
    try {
        const output = await prisma.auction_log.findFirst({
            include: {
                auction: {
                    include: {
                        product: true
                    }
                }
            },
            where : {
                auction : {
                    product : {
                        id : productId
                    }
                }
            },
        })
        if (!output) {
            return null;
        }
        return output;
    } catch (error) {
        console.log(error);
        return null
    }
}
