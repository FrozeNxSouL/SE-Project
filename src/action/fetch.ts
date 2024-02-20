"use server"
import prisma from "@/lib/db/prisma";

async function getProducts() {
    const products = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    return products
}

export default getProducts