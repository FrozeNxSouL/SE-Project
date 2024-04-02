"use server"
import prisma from "@/lib/prismaDB"

export async function changeProduct(productId: string, productName: string, productDesc: string, productPrice: number, imageUrl: string[]) {

    if (!productName || !productDesc || imageUrl.length === 0 || !productPrice || productPrice == 0) {
        throw Error("Missing required fields or price = 0");
    }

    if (productName.length > 100) {
        throw new Error("Product name cannot be longer than 100 characters");
    }
    if (productDesc.length > 600) {
        throw new Error("Product detail cannot be longer than 600 characters");
    }

    if (imageUrl.length > 5) {
        throw new Error("Cannot upload more than 5 images");
    }

    try {
        const list = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: productName,
                description: productDesc,
                price: productPrice,
                imageUrl: imageUrl,
            }
        })
        return "Product updated successfully";
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