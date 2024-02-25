"use server"
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
async function addProduct(formData: FormData) {
    // "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const image = formData.get("imageUrl");
    console.log(image);
    const price = Number(formData.get("price") || 0)

    if (!name || !description || !image || !price) {
        throw Error("Missing required fields");
    }

    try {
        const a = await prisma.product.create({
            data: { 
                name, 
                description, 
                imageUrl:["dawdw","dawdawd"], 
                price,
                tag:["figure:1-1"],
                status:"onsale" 
            },
        });
        // console.log(a);
    } catch (error) {
        console.log(error)
    }

    redirect("/");
}
export default addProduct