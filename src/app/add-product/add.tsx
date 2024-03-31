"use server"
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/getCurrentSession";
import { Product, Auction } from "@prisma/client";

async function addProduct(formData: Product, time: string | null) {
    const session = await getCurrentSession();
    if (!session) {
        redirect("/auth/login");
    }
    const byUser = session?.user?.id;

    if (!formData.name || !formData.description || formData.imageUrl.length === 0 || !formData.price || formData.price == 0 || !formData.tag || !formData.status) {
        throw Error("Missing required fields or price = 0 DDD");
    }
    
    if (formData.status == "auction" && !time) {
        throw Error("The auction product need time to expire");
    }

    try {
        const productOutput = await prisma.product.create({
            data: {
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageUrl,
                price: formData.price,
                tag: formData.tag,
                status: formData.status,
                userId: byUser
            },
        });
        if (formData.status == "auction") {
            const specificDate = new Date(time || "");
            const updatedAt = specificDate.toISOString();

            const auctionOutput: Auction = await prisma.auction.create({
                data: {
                    product: { connect: { id: productOutput.id } },
                    currentBid: formData.price,
                    updatedAt,
                    user: { connect: { id: byUser } },
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

    redirect("/user/mystore");
}
export default addProduct