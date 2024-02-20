"use server"
import prisma from '@/lib/db/prisma';
import { hashSync, compare } from 'bcrypt';
import { redirect } from "next/navigation";

export async function signin(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() ||  "";
    const pass = formData.get("password")?.toString() || "";
    let hashPass = "";
    if (!email.toString().includes("@") || !email.toString().includes(".")) {
        return {
            id: 1,
        }
    }
    try {
        const list = await prisma.user.findMany();
        let emailFound = false;
    
        for (const user of list) {
            if (user.email === email) {
                emailFound = true;
                hashPass = user.hashedPassword;
                break; 
            }
        }
    
        if (!emailFound) {
            return {
                id: 1,
            }
        }
    
    } catch (e) {
        console.error('Error retrieving user list:', e);
    }

    compare(pass, hashPass).then((result)=> {
        if (result) {
            console.log("logged")
        } else {
            return {
                id: 2,
            }
        }
    })
}

export async function signup(prevState: any, formData: FormData) {

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() ||  "";
    const pass = formData.get("password")?.toString() || "";
    const rePass = formData.get("re-password")?.toString() || "";
    
    const filters = ["admin", "user", "test", "nu", " "]
    const list = await prisma.user.findMany();

    if (!email.toString().includes("@") || !email.toString().includes(".")) {
        return {
            id: 1,
        }
    }

    for (const user of list) {
        if (user.email.toString() == email) {
            return {
                id: 4,
            }
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



    const hashPass: string = hashSync(pass, 10);

    let passed: boolean = true
    try {
        const a = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: hashPass,
                address: "",
                phone: "",
                score: 0,
                picture: "",
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