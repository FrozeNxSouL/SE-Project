"use server"
import prisma from "@/lib/prismaDB"

export async function changeProduct(productId: string, productName: string, productDesc: string, productPrice: number) {
    try {
        const list = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: productName,
                description: productDesc,
                price: productPrice
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(productId: string) {
    try {
        const result = await prisma.product.delete({
            where: {
                id: productId
            }
        })
    } catch (error) {
        console.log(error)
    }
}