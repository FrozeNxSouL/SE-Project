"use server"
import prisma from "@/lib/db/prisma";
async function getUser(){
    console.log(await prisma.user.findMany())
}
export default getUser