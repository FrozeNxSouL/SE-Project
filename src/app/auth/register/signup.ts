"use server"
import prisma from '@/lib/db/prisma';
import { hashSync } from 'bcrypt';
import { redirect } from "next/navigation";

export interface signUpForm {
    email: string,
    name: string,
    pass: string,
    rePass: string
}

export async function signup(signUpData: signUpForm) {
    const email = signUpData.email;
    const name = signUpData.name;
    const pass = signUpData.pass;
    const rePass = signUpData.rePass;

    if (!email || !name || !pass || !rePass) {
        throw new Error("Please, Fill all required fields")
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Invalid email");
    }
    
    if (pass !== rePass) {
        throw new Error("Password do not match")
    }

    const filters = [" "]
    filters.forEach(word => {
        if (name.includes(word)) {
            throw new Error("Can't use this name")
        }
    });

    const isHas = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (isHas) {
        throw new Error("This email has been registered")
    }

    const hashPass: string = hashSync(pass, 10);
    try {
        const a = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: hashPass,
                address: [],
                phone: "",
                score: 0,
                role : "user",
                picture: "https://mpics.mgronline.com/pics/Images/557000005527401.JPEG",
            }
        })
    } catch (e){
        throw new Error("Prisma error")
    }
    redirect("/auth/login");
}