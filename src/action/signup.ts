"use server"
import prisma from '@/lib/db/prisma';

export async function signup(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() ||  "";
    const pass = formData.get("password")?.toString() || "";
    const rePass = formData.get("re-password")?.toString() || "";
    
    const filters = ["admin", "user", "test"]

    if (!email.toString().includes("@") || !email.toString().includes(".")) {
        return {
            id: 1,
        }
    }

    for (const word of filters) {
        if (name.toString().includes(word)) {
            return {
                id: 2,
            }
        }
    }

    if (pass !== rePass) {
        return {
            id: 3,
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