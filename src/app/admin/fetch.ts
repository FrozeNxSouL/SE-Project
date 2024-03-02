"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getManage() {
    const list = await prisma.management.findFirst()
    return list
}

export async function changeTax(newtax: number|undefined,newcategory: JSON|null){
    const list = await prisma.management.update({
        where: {
            id: "65decc90137f28b543937afb"
        },
        data: {
            tax: newtax,
            category: newcategory
        }
    })
}
export async function tagAdd(addname: string,addurl: string) {
    const list = await prisma.category.create({
        data:{
            name: addname,
            url: addurl
        }
    })
}
export async function editTag(newcategory: JSON|null) {
    const list = await prisma.management.update({
        where: {
            id: "65decc90137f28b543937afb"
        },
        data: {
            category: newcategory
        }
    })
}

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

