"use server"
import prisma from "@/lib/db/prisma";
import { CartProductType } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation"

export interface requestProducts {
    quantity: number,
    sort?: string,
    keyword?: string | null,
    price?: {
        min: number,
        max: number,
    },
    page?: number,
    tag?: string[] | null,
    status?: string | null,
}

export interface requestAuctions {
    quantity: number,
    sort?: string,
    keyword?: string | null,
    price?: {
        min: number,
        max: number,
    },
    page?: number,
    tag?: string[]
}


export const getAuctions = async (request: requestAuctions) => {
    const where: any = {
        product: {
            status: "auction",
        }
    };

    if (request.tag) {
        where.tag = {
            product: {
                hasSome: [request.tag[0]],
            }
        }
    }
    if (request.keyword) {
        where.name = {
            product: {
                contains: request.keyword,
                mode: 'insensitive',
            }
        }
    }
    if (request.price && request.price.min < request.price.max) {
        where.price = {
            product: {
                gte: request.price.min,
                lte: request.price.max,
            }
        }
    }

    try {
        const list = await prisma.auction.findMany({
            include: {
                product: true
            },
            take: request.quantity,
            skip: (request.page) ? (request.page - 1) * request.quantity : 0,
            orderBy: {
                updatedAt: (request.sort == "asc") ? "asc" : "desc"
            },
            where,
        })
        const count = await prisma.auction.count({
            orderBy: {
                updatedAt: (request.sort == "asc") ? "asc" : "desc"
            },
            where,
        })
        return { list, count }
    } catch (error) {
        console.log(error)
        throw new Error("Can't get product from database")
    }
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
    return products
}

export const getProducts = async (request: requestProducts) => {
    const where: any = {};

    if (request.status) {
        where.status = request.status;
    } else {
        where.OR = [
            { status: "sell" },
            { status: "auction" }
        ]
    }

    if (request.tag) {
        where.tag = {
            hasSome: [request.tag[0]]
        }
    }
    if (request.keyword) {
        where.name = {
            contains: request.keyword,
            mode: 'insensitive'
        }
    }
    if (request.price && request.price.min < request.price.max) {
        where.price = {
            gte: request.price.min,
            lte: request.price.max
        }
    }
    try {
        const list = await prisma.product.findMany({
            include: {
                auction: true,
            },
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

export async function getProductDetail(productId: string) {
    let productDetails;
    try {
        productDetails = await prisma.product.findUnique({
            include: {
                User: true
            },
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
                        product: {
                            include: {
                                User: true
                            }
                        }
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

        if (!findInLog) {
            throw error
        }

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

            const temp: CartProductType[] = [{
                id: findInLog?.auction.product.id || "",
                name: findInLog?.auction.product.name || "",
                description: findInLog?.auction.product.description || "",
                quantity: 1,
                price: findInLog?.auction.product.price || 0,
                img: findInLog?.auction.product.imageUrl || [],
                tag: findInLog?.auction.product.tag || [],
            }]

            const orderData = {
                user: { connect: { id: findInLog.auction.bidderId } },
                totalPrice: findInLog.auction.currentBid,
                currency: 'thb',
                status: "complete",
                deliveryStatus: "pending",
                products: temp,
            };
            const updateTransaction = await prisma.transaction.create({
                data: orderData
            })

            const wallet = await prisma.wallet.findFirst({
                where: {
                    User: {
                        id: findInLog?.auction.bidderId,
                    }
                },
                include: {
                    User: true
                },
            })

            if (!wallet) {
                throw new Error
            }

            const updateWallet = await prisma.wallet.update({
                where: {
                    id: wallet?.id,
                },
                include: {
                    User: true
                },
                data: {
                    cash: wallet?.cash - findInLog?.auction.currentBid,
                }
            })
        }

    } catch (error) {
        console.error('Error updating record:', error);
    }
}

export async function updateNewBid(productId: string, inputBid: number, userId: string) {
    try {
        const findInWallet = await prisma.wallet.findFirst({
            include: {
                User: true
            },
            where: {
                User: {
                    id: userId
                }
            },
        })
        if (!findInWallet) {
            throw new Error(`Error`);
        }

        if (findInWallet.cash - inputBid < 0) {
            return;
        }

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
                        AND: [
                            {
                                id: productId
                            },
                            {
                                status: "auction"
                            }
                        ]

                    }
                }
            },
        })
        if (!findInLog) {
            throw new Error(`Error`);
        }

        const arrID = findInLog?.bidder_id
        arrID?.push(findInLog?.auction?.bidderId);
        const arrBid = findInLog?.bidding_amount
        arrBid?.push(findInLog?.auction?.currentBid);

        const updateLog = await prisma.auction_log.update({
            where: {
                id: findInLog.id
            },
            data: {
                bidder_id: arrID,
                bidding_amount: arrBid
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

        revalidatePath(`/auction/${productId}`, "page");

    } catch (error) {
        console.error('Error updating record:', error);
    }
}

export async function getUserandWallet(userID: string) {
    try {
        const findInWallet = await prisma.wallet.findFirst({
            include: {
                User: true
            },
            where: {
                User: {
                    id: userID
                }
            },
        })
        if (!findInWallet) {
            throw new Error(`Error`);
        }

        return findInWallet

    } catch (error) {
        console.error('Error updating record:', error);
    }
}

export async function productFromSeller(sellerID: string) {
    const product = await prisma.product.findMany({
        where: {
            AND: [
                {
                    userId: sellerID
                },
                {
                    OR: [
                        {
                            status: "sell"
                        },
                        {
                            status: "auction"
                        }
                    ]
                }
            ]
        }
    })

    const user = await prisma.user.findFirst({
        where: {
            id: sellerID
        }
    })
    if (!product) {
        throw new Error(`Error`);
    }

    return { product, user }
}

export async function getOrderProduct(userID: string) {
    try {
        const orders = await prisma.product.findMany({
            where: {
                status: "finished",
                User: {
                    id: userID
                }
            },
            include: {
                Transaction : true
            }
        })
        return orders
    } catch (error: any) {
        throw new error
    }
}

export async function getPendingProduct(userID: string) {
    try {
        const orders = await prisma.product.findMany({
            where: {
                status: "pending",
                User: {
                    id: userID
                }
            },
            include: {
                Transaction : true
            }
        })

        return orders
    } catch (error: any) {
        throw new error
    }
}

export async function getCompletedProduct(userID: string) {
    try {
        const orders = await prisma.product.findMany({
            where: {
                status: "completed",
                User: {
                    id: userID
                }
            },
            include: {
                Transaction : true
            }
        })

        return orders
    } catch (error: any) {
        throw new error
    }
}

export async function updateProductStatus(productID: string) {
    try {
        const orders = await prisma.product.update({
            where: {
                id: productID
            },
            data: {
                status: "pending"
            }
        })

        return orders
    } catch (error: any) {
        throw new error
    }
}