"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createReport(Des: string) {
    await prisma.report.create({
        data:{
            reportPicture: ["gay"],
            reportDescription: Des,
            reportStatus: "1",
            reportingUserID: "gay",
            userId: "65e226c76685873d32bd9fcb"
        }
    });
   
}
