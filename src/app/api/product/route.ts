import prisma from "@/lib/prismaDB";
import { NextResponse  } from "next/server";
import getCurrentUser from "@/app/action/getCurentUser";

export async function POST(request: Request){
    const currentUser = await getCurrentUser()
    const body = await request.json();
    const {name, description, price,image,tag, status } = body;

    const product = await prisma.product.create({
        data:{
            name,
                description,
                imageUrl: [image],
                price,
                tag: [tag],
                status,
                userId: currentUser?.id
        }

    });
    return NextResponse.json(product);
}