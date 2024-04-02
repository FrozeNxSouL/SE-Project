"use server"
import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";

interface CartItemType {
    quantity: number;
    id: string;
    description: string;
    img: string[];
    name: string;
    // Add any other properties if needed
}

export async function getManage() {
    try {
        const list = await prisma.management.findFirst({
            include: {
                categorys: true,
            }
        });
        if(!list){
            throw error
        }
        return list
    } catch (error) {
        console.log(error)
    }
}

export async function scanForTrans(itemId: string){
    
}

export async function updateWalletForCartItems(cartItems: CartItemType[]) {
    try {
        // Create a map to store the total amount for each product owner
        const ownerTotalMap: { [userId: string]: number } = {};

        // Calculate the total amount for each product owner
        for (const item of cartItems) {
            // Step 1: Find the product owner's userId
            const product = await prisma.product.findUnique({
                where: {
                    id: item.id,
                },
                select: {
                    userId: true,
                    price: true,
                },
            });

            if (!product || !product.userId) {
                console.error(`Product with id ${item.id} or its owner not found`);
                continue; // Skip to the next item
            }

            const userId = product.userId;

            // Calculate the total amount for the product owner
            if (ownerTotalMap[userId]) {
                ownerTotalMap[userId] += item.quantity * product.price;
            } else {
                ownerTotalMap[userId] = item.quantity * product.price;
            }
        }

        // Update the wallet for each product owner
        for (const userId of Object.keys(ownerTotalMap)) {
            const totalAmount = ownerTotalMap[userId];

            // Step 2: Retrieve the current cash amount from the user's wallet
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    wallet: {
                        select: {
                            cash: true,
                        },
                    },
                },
            });

            if (!user || !user.wallet) {
                console.error(`User with id ${userId} or their wallet not found`);
                continue; // Skip to the next user
            }

            const currentCash = user.wallet.cash;

            // Step 3: Update the user's wallet with the new cash amount
            const newCash = currentCash + totalAmount;
            await prisma.wallet.update({
                where: {
                    userId: userId,
                },
                data: {
                    cash: newCash,
                },
            });

            console.log(`Wallet updated for user with id ${userId}`);
        }
    } catch (error) {
        console.error('Error updating wallet for cart items:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function findUserByProductId(productId: string) {
    try {
        // Step 1: Find the product owner's userId
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                User: true, // Include the owner (user) details
            },
        });

        if (!product) {
            console.error(`Product with id ${productId} not found`);
            return null;
        }

        // Step 2: Access the user details from the product
        const user = product.User;

        if (!user) {
            console.error(`User not found for product with id ${productId}`);
            return null;
        }

        console.log('Owner User:', user);
        return user;
    } catch (error) {
        console.error('Error finding user by product id:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getProductById(productId: string|undefined) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        return product?.userId;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export const getAddressByUserId = async (userId: string) => {
    try {
      // Query the database to find addresses associated with the user ID
      const addresses = await prisma.transaction.findMany({
        where: {
          userId: userId,
        },
      });
  
      return addresses[0];
    } catch (error) {
      // Handle errors, such as database errors
      console.error('Error fetching addresses:', error);
      throw error;
    }
  };

export async function changeTax(newtax: number) {
    try {
        const list = await prisma.management.update({
            where: {
                id: "65decc90137f28b543937afb"
            },
            data: {
                tax: newtax,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function isScored(itemId: string): Promise<boolean> {
    try {
        // Find the product by itemId
        const product = await prisma.product.findUnique({
            where: {
                id: itemId
            },
            select: {
                score: true,
            }
        });

        return product?.score !== 0;
    } catch (error) {
        console.error('Error checking if product is scored:', error);
        throw error;
    }
}

export async function updateOwnerScore(itemId: string, newRating: number) {
    try {
        // Find the product by itemId
        const product = await prisma.product.findUnique({
            where: {
                id: itemId
            }
        });
        const product1 = await prisma.product.update({
            where: {
                id: itemId
            },
            data: {
                score: newRating
            }
        });
        
        if (!product) {
            throw new Error(`Product with ID ${itemId} not found`);
        }

        const ownerId = product.userId;

        if (!ownerId) {
            throw new Error(`Owner ID not found for product with ID ${itemId}`);
        }

        // Find the existing score of the owner
        const user = await prisma.user.findUnique({
            where: {
                id: ownerId
            }
        });

        if (!user) {
            throw new Error(`User with ID ${ownerId} not found`);
        }

        // Add the new rating to the existing score
        const stackedRating = user.score + newRating;

        // Update the owner's score
        const updatedUser = await prisma.user.update({
            where: {
                id: ownerId
            },
            data: {
                score: stackedRating
            }
        });

        console.log('Owner score updated successfully:', updatedUser);
    } catch (error) {
        console.error('Error updating owner score:', error);
    }
}

export async function updateProductsInTransaction(paymentIntentId: string): Promise<void> {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                paymentIntentId: paymentIntentId
            },
            include: {
                product: true // Include associated products
            }
        });

        if (!transaction) {
            throw new Error(`Transaction with paymentIntentId ${paymentIntentId} not found`);
        }

        const transactionId = transaction.id;
        const productsToUpdate = transaction.products;

        // Step 2: Update products to have the transactionId
        for (const product of productsToUpdate) {
            await prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    status:"finished",
                    transactionId: transactionId
                }
            });
        }

        console.log('Products in transaction updated successfully with transactionId:', transactionId);
    } catch (error) {
        console.error('Error updating products in transaction:', error);
        throw new Error('Failed to update products in transaction');
    }
}

export async function updateWallet(userId: string, formattedPrice: number | null): Promise<void> {
    try {
        if (formattedPrice === null) {
            console.log('Formatted price is null. No update to wallet needed.');
            return; // Return early if formattedPrice is null
        }

        // Find the wallet associated with the userId
        const wallet = await prisma.wallet.findUnique({
            where: {
                userId: userId
            }
        });

        if (!wallet) {
            throw new Error(`Wallet for user ${userId} not found`);
        }

        // Calculate the new cash amount
        const newCashAmount = (wallet.cash ?? 0) + formattedPrice;

        // Update the cash in the wallet with the new amount
        await prisma.wallet.update({
            where: {
                id: wallet.id
            },
            data: {
                cash: newCashAmount
            }
        });

        console.log(`Wallet updated successfully for user ${userId}`);
    } catch (error) {
        console.error('Error updating wallet:', error);
        throw new Error('Failed to update wallet');
    } finally {
        await prisma.$disconnect();
    }
}

export async function tagAdd(addname: string, addurl: string, adminid: string) {
    const list = await prisma.category.create({
        data: {
            name: addname,
            url: addurl,
            managementId: adminid
        }
    })
}

export async function editTag(catid: string, catname: string, caturl: string) {
    const list = await prisma.category.update({
        where: {
            id: catid
        },
        data: {
            name: catname,
            url: caturl
        }
    })
}

export async function deleteTag(catid: string) {
    const list = await prisma.category.delete({
        where: {
            id: catid
        }
    })
}

export async function getUser(usersearch: string) {
    try {
        const list = await prisma.user.findMany({
            include: {
                // report: true,
                report: { where: { reportStatus: "1" } },
                product: {where: { status: "sell"}}
            },
            where: {
                AND: [
                    { name: { contains: usersearch } },
                    // { report: { some: {} } }
                    {
                        report: {
                            some: {
                                reportStatus: "1"
                            }
                        }
                    }
                ]
            }
        })
        revalidatePath("/admin")
        return list
    } catch (error) {
        return []
    }
}

export async function deleteUser(userid: string) {
    await prisma.user.update({
        where: {
            id: userid
        },
        data: {
            role: "deleted"
        }
    })
}
export async function deleteProduct(productid: string) {
    await prisma.product.update({
        where: {
            id: productid
        },
        data: {
            status: "expired"
        }
    })
}
export async function statusReport(reportid: string) {
    await prisma.report.update({
        where: {
            id: reportid
        },
        data: {
            reportStatus: "0"
        }
    })
}
