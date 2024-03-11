import { getCurrentSession } from "@/lib/getCurrentSession";
import { redirect } from "next/navigation";

// Inside an async function or an API route
export default async function getCurrentUser() {
    try {
        const session = await getCurrentSession();
        if (!session) {
            redirect("/auth/login")
        }
        return session
    } catch (error) {
        // console.error("Error getting current user:", error);
        return null;
    }
}
