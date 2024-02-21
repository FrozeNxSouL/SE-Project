"use server"
import prisma from "@/lib/db/prisma";

export async function getAuctionProduct() {
    const products = await prisma.product.findMany({
        take:3,
        orderBy: {
            id: 'desc'
        }
    })
    return products
}

export async function getProducts() {
    const products = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    return products
}
