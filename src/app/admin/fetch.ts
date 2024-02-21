"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getUser(usersearch: string) {
    try {
        const list = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: usersearch } },
                ]
            }
        })
        revalidatePath("/admin")
        return list
    } catch (error) {
        return []
    }
    
}
export async function deleteUser(userid: string) {
    console.log(userid)
    await prisma.user.delete({
        where: {
            id: userid
        }
    })
}

