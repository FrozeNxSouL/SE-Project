"use server"
import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";


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

export async function getProductById(productId: string) {
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
        console.log(product1)
        
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

export async function updateProductsTransaction(paymentIntentId: string, items: { productId: string }[]): Promise<void> {
    try {
        // Step 1: Find the transaction with the provided paymentIntentId
        const transaction = await prisma.transaction.findUnique({
            where: {
                paymentIntentId: paymentIntentId
            }
        });

        if (!transaction) {
            throw new Error(`Transaction with paymentIntentId ${paymentIntentId} not found`);
        }

        const transactionId = transaction.id;

        // Step 2: Update products to have the transactionId
        for (const item of items) {
            await prisma.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    transactionId: transactionId
                }
            });
        }

        console.log('Products updated with transactionId:', transactionId);
    } catch (error) {
        console.error('Error updating products transaction:', error);
        throw new Error('Failed to update products transaction');
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
                report: { where: { reportStatus: "1" } }
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

export async function statusReport(reportid: string, userid: string) {
    await prisma.report.update({
        where: {
            id: reportid
        },
        data: {
            reportStatus: "0"
        }
    })
    await prisma.user.update({
        where: {
            id: userid
        },
        data: {
            role: "deleted"
        }
    })

}
