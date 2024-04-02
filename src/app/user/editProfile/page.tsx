"use server"
import { getCurrentSession } from "@/lib/getCurrentSession";
import EditProfile from "./EditComponent";

export default async function Page() {
    const session = await getCurrentSession();

    return (
        <EditProfile data={session?.user.picture}></EditProfile>
    );
}
