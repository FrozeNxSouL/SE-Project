"use server"
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
async function addProduct(formData: FormData) {
    // "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const image = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0)
    const tag = formData.get("tag")?.toString();
    const status = formData.get("status")?.toString();

    if (!name || !description || !image || !price || !tag || !status) {
        throw Error("Missing required fields or price = 0");
    }

    try {
        const a = await prisma.product.create({
            data: {
                name,
                description,
                imageUrl: [image],
                price,
                tag: [tag],
                status,
            },
        });
        console.log(a);
    } catch (error) {
        console.log(error)
    }

    // redirect("/");
}
export default addProduct