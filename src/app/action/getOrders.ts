import prisma from "@/lib/db/prisma";

export default async function getOrders(){
    try{
        const orders = await prisma.transaction.findMany({
            include:{
                user: true
            },
            orderBy: {
                create_transaction_date: 'desc'
            }
        })

        return orders
    }catch(error: any){

    }
}