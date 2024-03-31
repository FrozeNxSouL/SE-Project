"use server"
import prisma from "@/lib/prismaDB"


export const searchItem = async ()=> {
    try {
        const result = await prisma.product.findMany();
        return result
    } catch (error) {
        throw new Error("Error on fetching");
    }
}