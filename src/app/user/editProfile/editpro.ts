"use server"
import prisma from "@/lib/db/prisma";
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function updateporfile(userid: string,username: string,useremail :string,userphone :string,userpic :string) {
    try {
        const list = await prisma.user.update({
            where:{
                id: userid
            },
            data:{
                name: username,
                email: useremail,
                phone: userphone,
                picture: userpic
            }
        });
        return list
    } catch (error) {
        console.log(error)
    }
}