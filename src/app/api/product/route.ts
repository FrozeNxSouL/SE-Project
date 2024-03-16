import prisma from "@/lib/prismaDB";
import { NextResponse  } from "next/server";
import { getCurrentSession } from "@/lib/getCurrentSession";

export async function POST(request: Request){
    const session = await getCurrentSession();
    const currentUser = session?.user
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