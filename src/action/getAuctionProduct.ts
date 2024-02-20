"use server"
import prisma from "@/lib/db/prisma";

async function getAuctionProduct() {
    const products = await prisma.product.findMany({
        take:3,
        orderBy: {
            id: 'desc'
        }
    })
    return products
}

export default getAuctionProduct