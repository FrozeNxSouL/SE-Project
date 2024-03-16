import { getCurrentSession } from "@/lib/getCurrentSession";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {id:string}}){
    const session = await getCurrentSession();
    const currentUser = session?.user

    if(!currentUser || currentUser.role !== "manager"){
        return NextResponse.error();
    }
    const product = await prisma?.product.delete({
        where: {id: params.id}
    })

    return NextResponse.json(product);
}