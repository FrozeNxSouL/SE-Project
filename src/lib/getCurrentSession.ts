import { authOption } from "@/app/api/auth/[...nextauth]/authoption";
import { getServerSession } from "next-auth";

export async function getCurrentSession() {
    const session = await getServerSession(authOption);
    // console.log(session?.user)
    return session
}