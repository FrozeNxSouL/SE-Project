import getCurrentUser from "@/app/action/getCurentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function DELETE(request: Request, {params}: {params: {id:string}}){
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "manager"){
        return NextResponse.error();
    }
    const product = await prisma.product.delete({
        where: {id: params.id}
    })

    return NextResponse.json(product);
}