import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDB";

export async function GET(){
    try {
        const temp = await prisma.user.findFirst();
        return NextResponse.json({message : "dude"})
    } catch (error) {
        
    }
}