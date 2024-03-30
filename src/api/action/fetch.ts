"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation"

export interface requestProducts {
    quantity: number,
    sort: string,
    keyword: string | null,
    price: {
        min: number,
        max: number,
    },
    page: number
}
export interface requestAuctions {

}

export const getProducts = async (request: requestProducts) => {

    const where: any = {};
    if (request.keyword) {
        where.name = {
            contains: request.keyword,
            mode: 'insensitive'
        }
    }
    if (request.price.min < request.price.max) {
        where.price = {
            gte: request.price.min,
            lte: request.price.max
        }
    }

    try {
        const list = await prisma.product.findMany({
            take: request.quantity,
            skip: (request.page) ? (request.page - 1) * request.quantity : 0,
            orderBy: {
                price: (request.sort == "asc") ? "asc" : "desc"
            },
            where,
        })
        const count = await prisma.product.count({
            orderBy: {
                price: (request.sort == "asc") ? "asc" : "desc"
            },
            where,
        })
        return { list, count }
    } catch (error) {
        console.log(error)
        throw new Error("Can't get product from database")
    }


}

export const getAuctions = (request: requestAuctions) => {

}
export async function getAuctionProductbyTag(tagInput: string) {
    try {
        const output = await prisma.auction.findMany({
            include: {
                product: true
            },
            where: {
                AND: [
                    {
                        product: {
                            tag: {
                                hasSome: [tagInput]
                            }
                        },
                    },
                    {
                        product: {
                            status: "auction"
                        },
                    },
                ],
            },
            // take: 3,
            orderBy: {
                updatedAt: 'desc'
            }
        });
        if (!output) {
            notFound();
        }
        // console.log(output)
        return output;
    } catch (error) {
        console.log(error);
        notFound()
    }
}

export async function getProductbyTag(tagInput: string) {
    try {
        const output = await prisma.product.findMany({
            where: {
                AND: [
                    {
                        tag: {
                            hasSome: [tagInput]
                        }
                    },
                    { status: "sell" },
                ],
            }
        });
        // console.log(output)
        if (!output) {
            notFound();
        }
        return output;
    } catch (error) {
        console.log(error);
        notFound()
    }
}

export async function getAuctionProduct() {
    const products = await prisma.auction.findMany({
        take: 3,
        include: {
            product: true
        },
        where: {
            product: {
                status: "auction"
            },
        },
        orderBy: {
            updatedAt: 'asc'
        }
    })
    // console.log(products)
    return products
}

export async function getProductDetail(productId: string) {
    let productDetails;
    try {
        productDetails = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        });
    } catch (error) {
        console.log(error);
        return null
    }
    if (!productDetails) {
        throw new Error("This product is not available");
    }
    const seller = await prisma.user.findUnique({
        where: {
            id: productDetails.userId || "",
        },
        select: {
            id: true,
            name: true,
            address: true,
            email: true,
            phone: true,
            picture: true,
            score: true,
            role: true,
        }
    });

    return { productDetails, seller }
}

export async function getAuctionDetail(productId: string) {
    try {
        const output = await prisma.auction_log.findFirst({
            include: {
                auction: {
                    include: {
                        product: true
                    }
                }
            },
            where: {
                auction: {
                    product: {
                        id: productId
                    }
                }
            },
        })
        if (!output) {
            return null;
        }
        return output;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getUserDetail(userId: string) {
    try {
        const output = await prisma.user.findFirst({
            where: {
                id: userId
            },
        })
        if (!output) {
            return null;
        }
        return output;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function updateExpiredStatus(productId: string) {
    try {
        const findInLog = await prisma.auction_log.findFirst({
            include: {
                auction: {
                    include: {
                        product: true
                    }
                }
            },
            where: {
                auction: {
                    product: {
                        id: productId
                    }
                }
            },
        })
        if (findInLog?.auction.product.price == findInLog?.auction.currentBid) {
            const updatedRecord = await prisma.product.update({
                where: { id: productId },
                data: {
                    status: "expired",
                },
            });
        } else {
            const updatedRecord = await prisma.product.update({
                where: { id: productId },
                data: {
                    status: "finished",
                },
            });

            // const updateTransaction = await prisma.transaction.create({

            // })
        }


        //   console.log('Updated record:', updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
    }
}

export async function updateNewBid(productId: string, inputBid: number, userId: string) {
    try {
        const findInLog = await prisma.auction_log.findFirst({
            include: {
                auction: {
                    include: {
                        product: true
                    }
                }
            },
            where: {
                auction: {
                    product: {
                        AND : [
                            {
                                id: productId
                            },
                            {
                                status : "auction"
                            }
                        ]

                    }
                }
            },
        })
        if (!findInLog) {
            console.log("error at findInLog")
            throw new Error(`Error`);
        }

        const arrID = findInLog?.bidder_id
        arrID?.push(findInLog?.auction?.bidderId);
        const arrBid = findInLog?.bidding_amount
        arrBid?.push(findInLog?.auction?.currentBid);

        const updateLog = await prisma.auction_log.update({
            where : {
                id : findInLog.id
            },
            data : {
                bidder_id : arrID,
                bidding_amount : arrBid
            }
        })

        const auctionUpdate = await prisma.auction.update({
            where: {
                id: findInLog.auction.id
            },
            data: {
                currentBid: inputBid,
                bidderId: userId
            }
        });

        // console.log(updateLog,"LOG")

        // console.log(auctionUpdate,"auction")

        revalidatePath(`/auction/${productId}`, "page");
        // redirect(`/auction/${productId}`);

    } catch (error) {
        console.error('Error updating record:', error);
    }
}
