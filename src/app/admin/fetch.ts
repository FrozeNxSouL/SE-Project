"use server"
import prisma from "@/lib/db/prisma";
export async function getUser() {
    const list = await prisma.user.findMany()
    return list
}
export async function deleteUser(userid: string) {
    const list = await prisma.user.delete({
        where: {
            id: userid
        }
    })
}

export async function searchUser(usersearch: string) {
    const list = await prisma.user.findMany({
        where: {
            OR: [
                {name: usersearch},
                {id: usersearch}
            ]
        }
    })
}
