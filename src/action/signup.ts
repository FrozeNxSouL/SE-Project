"use server"
import prisma from '@/lib/db/prisma';

export async function signup(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() ||  "";
    const pass = formData.get("password")?.toString() || "";
    const rePass = formData.get("re-password")?.toString() || "";
    
    if (!email.toString().includes("@") || !email.toString().includes(".")) {
        return {
            id: 1,
            label: "invalid mail"
        }
    }

    if (pass.toString()!= rePass.toString()) {
        return {
            id: 2,
            label: "not match"
        }
    }

    
    try {
        const a = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: "asd",
                address: "",
                phone: "",
                score: 0,
                picture: "",
            }
        })
    } catch (e){
        console.log(e)
    }
}