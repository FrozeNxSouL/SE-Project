"use server"

import { Session } from "next-auth";
import prisma from "@/lib/prismaDB";

export default async function updateAddr(addr: string[], session: Session | null ) {
    if (!session) {
        throw new Error("No user data, Re login");
    }
    try {
        const res = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                address: addr,
            }
        })
        return "Address updated successfully";
    } catch (e: any) {
        throw new Error(e.message);
    }
}