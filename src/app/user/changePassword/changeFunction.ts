"use server"
import { compare, hashSync } from "bcrypt";
import prisma from "@/lib/prismaDB";
import { Session } from "next-auth";

export default async function updatePassword(current: string | null, new1: string | null, new2: string | null, session: Session | null) {
    if (!current) {
        throw new Error("Please, Enter current password");
    }
    if (!new1) {
        throw new Error("Please, Enter new password");
    }
    if (!new2) {
        throw new Error("Please, Enter repeat password");
    }
    if (current == new1 || current == new2) {
        throw new Error("Current and new password are the same");
    }
    if (new1 !== new2) {
        throw new Error("Password do not match");
    }

    try {
        // Fetch user from the database
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            },
            select: {
                hashedPassword: true,
            }
        });
        if (!user) {
            throw new Error("No user data, Re login");
        }

        // Compare the current password with the one stored in the database
        const isMatch = await compare(current, user.hashedPassword);

        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        // Hash the new password
        const hashedNewPassword = hashSync(new1, 10); // Adjust the salt rounds as needed

        // Update the user's password in the database
        await prisma.user.update({
            where: {
                id: session?.user.id
            },
            data: {
                hashedPassword: hashedNewPassword
            }
        });

        return "Password updated successfully";
        
    } catch (e: any) {
        throw new Error("Failed to update password: " + e.message);
    }
}
