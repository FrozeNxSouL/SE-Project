"use server"
import prisma from '@/lib/db/prisma';
import { hashSync, compare } from 'bcrypt';
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() ||  "";
    const pass = formData.get("password")?.toString() || "";
    const rePass = formData.get("re-password")?.toString() || "";
    
    const filters = ["admin", "user", "test", "nu", " "]




    const hashPass: string = hashSync(pass, 10);

    let passed: boolean = true
    try {
        const a = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: hashPass,
                address: ["bangbon"],
                phone: "",
                score: 0,
                role : "manager",
                picture: "https://mpics.mgronline.com/pics/Images/557000005527401.JPEG",
            }
        })
    } catch (e){
        passed = false
        console.log(e)
    }

    if (passed) {
        redirect("/");
    }
}