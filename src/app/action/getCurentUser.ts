import { getCurrentSession } from "@/lib/getCurrentSession";

// Inside an async function or an API route
export default async function getCurrentUser() {
    try {
        const session = await getCurrentSession();
        return session
    } catch (error) {
        // console.error("Error getting current user:", error);
        return null;
    }
}
