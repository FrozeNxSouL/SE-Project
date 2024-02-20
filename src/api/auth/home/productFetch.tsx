"use server"
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function getAuctionProduct() {
    try {
        const output = await prisma.product.findMany({
            orderBy : {
                createdAt:"asc"
            }
        });
        console.log(NextResponse.json(output))
        return NextResponse.json(output);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"error"},{status:500})
    }
}

// async function addProduct(formData: FormData) {
//     // "use server";

//     const name = formData.get("name")?.toString();
//     const description = formData.get("description")?.toString();
//     const imageUrl = formData.get("imageUrl")?.toString();
//     const price = Number(formData.get("price") || 0)

//     if (!name || !description || !imageUrl || !price) {
//         throw Error("Missing required fields");
//     }

//     try {
//         const a = await prisma.product.create({
//             data: { name, description, imageUrl, price },
//         });
//         console.log(a);
//     } catch (error) {
//         console.log(error)
//     }

//     redirect("/");
// }
// export default addProduct