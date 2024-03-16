import prisma from "@/lib/db/prisma";

export default async function getCreatorUserId(productId: string) {
  try {
    // Retrieve the product using the productId
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      // Product not found
      return null;
    }

    // Access userId from the product
    const userId = product.userId;

    return userId;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching creator user ID:", error);
    return null; // Rethrow the error or handle it as needed
  }
}