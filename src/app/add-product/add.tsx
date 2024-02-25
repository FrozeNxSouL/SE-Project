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
    const tag = formData.get("tag")?.toString();
    const status = formData.get("status")?.toString();

    if (!name || !description || !image || !price || !tag || !status) {
        throw Error("Missing required fields or price = 0");
    }

    try {
        const productOutput = await prisma.product.create({
            data: {
                name,
                description,
                imageUrl: [image],
                price,
                tag: [tag],
                status,
            },
        });
        console.log(productOutput);
        if (status == "auction") {
            const auctionOutput = await prisma.auction.create({
                data: {
                    // productId: productOutput.id,
                    product: { connect: { id: productOutput.id } },
                    currentBid: price, 
                    // bidderId: productOutput.id,
                    user: { connect: { id: productOutput.id } },
                },
            });

            const auctionLogOutput = await prisma.auction_log.create({
                data: {
                    // auctionId: auctionOutput.id,
                    auction: { connect: { id: auctionOutput.id } },
                },
            });
            console.log("get auction !")
        }
    } catch (error) {
        console.log(error)
    }

    // redirect("/");
}
export default addProduct