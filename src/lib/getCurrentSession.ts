import { authOption } from "@/app/api/auth/[...nextauth]/authoption";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";


export async function getCurrentSession() {
    const session = await getServerSession(authOption);
    const data: User = {
        id: session?.user.id ?? "",
        name: session?.user.name ?? "",
        address: session?.user.address,
        email: "",
        hashedPassword: "",
        phone: "",
        picture: "",
        score: 0,
        role: ""
    }
    return session
}