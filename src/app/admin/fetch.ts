"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getManage() {
    const list = await prisma.management.findFirst()
    return list
}

// export async function changeTax(newtax: number){
//     const list = await prisma.management.update({
//         where: {
//             id: 
//         },
//         data: {
//             tax: newtax
//         }
//     })
// }

export async function getUser(usersearch: string) {
    try {
        const list = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: usersearch } },
                ]
            }
        })
        // const list = await prisma.report.findMany({
        //     include: {
        //         reportedUser: true 
        //     }
        // })
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

