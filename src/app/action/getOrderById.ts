import prisma from "@/lib/db/prisma";

interface  IParams{
    orderId?: string
}

export default async function getOrderById(params: IParams){
    try {
        const {orderId} = params

        const order = await prisma.transaction.findUnique({
            where: {
                id: orderId
            }
        })

        if(!order) return null

        return order
    } catch (error) {
        
    }
}