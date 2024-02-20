"use server"
import prisma from "@/lib/db/prisma";
async function getUser(){
    const list = await prisma.user.findMany()
    return list
}
export default getUser