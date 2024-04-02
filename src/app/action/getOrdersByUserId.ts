import prisma from "@/lib/db/prisma";

export default async function getOrdersByUserId(userId: string | undefined){
    try{
        const orders = await prisma.transaction.findMany({
            include:{
                user: true
            },
            orderBy: {
                create_transaction_date: 'desc'
            },
            where: {
                userId: userId
            }
        })

        return orders
    }catch(error: any){

    }
}