import prisma from "@/lib/prismaDB";

export default async function getCategory() {
    const list = await prisma.category.findMany();
    return list
}