import { getCurrentSession } from "@/lib/getCurrentSession";
import { signOut } from "next-auth/react";
import prisma from "@/lib/db/prisma";
// Inside an async function or an API route
export default async function getCurrentUser() {
    try {
        const session = await getCurrentSession();
        if (session?.user?.email) {
            // User is logged in, session.user contains user information
            const currentUser = await prisma.user.findUnique({
                where: {
                    email : session?.user?.email,
                },
            })
            if (session?.user.role == "deleted") {
                localStorage.clear()
                await signOut({
                callbackUrl: '/' // Redirect to the login page after logout
                })
                return null;
            }
            return {
                ...currentUser
            };
        } else {
            return null;
        }
    } catch (error) {
        // console.error("Error getting current user:", error);
        return null;
    }
}