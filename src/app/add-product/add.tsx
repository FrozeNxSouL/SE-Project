"use server"
import prisma from "@/lib/db/prisma";
import { Auction } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/getCurrentSession";

async function addProduct(formData: FormData) {
    const session = await getCurrentSession();
    if (!session) {
        redirect("/auth/login");
    }
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const image = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0)
    const tag = formData.get("tag")?.toString();
    const status = formData.get("status") === "on" ? "auction" : "normal";
    const time = formData.get("Time")?.toString();
    // const byUser = session.user.id;

    if (!name || !description || !image || !price || !tag || !status) {
        throw Error("Missing required fields or price = 0");
    }
    
    if (status == "auction" && !time) {
        throw Error("The auction product need time to expire");
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
        if (status == "auction") {
            const specificDate = new Date(time || "");
            const updatedAt = specificDate.toISOString();

            const auctionOutput: Auction = await prisma.auction.create({
                data: {
                    product: { connect: { id: productOutput.id } },
                    currentBid: price,
                    updatedAt,
                    user: { connect: { id: "65d581b7f9ee9189e1b19051" } },
                },
            });
            const auctionLogOutput = await prisma.auction_log.create({
                data: {
                    auction: { connect: { id: auctionOutput.id } },
                },
            });
        }
    } catch (error) {
        console.log(error)
    }

    redirect("/");
}
export default addProduct