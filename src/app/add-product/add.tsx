"use server"
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
async function addProduct(formData: FormData) {
    // "use server";
    const name = formData.get("name")?.toString();
    const description =formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0)

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required fields");
    }

    await prisma.products.create({
        data: {name,description,imageUrl,price},
    });

    redirect("/");
}
export default addProduct