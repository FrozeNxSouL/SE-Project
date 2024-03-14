"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createReport(Des: string,reportSelection: string[]) {
    const cleanedReportSelection = reportSelection.filter(value => value !== null);
    await prisma.report.create({
        data:{
            reportPicture: ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Alligator_gar_%28Atractosteus_spatula%29.JPG/1200px-Alligator_gar_%28Atractosteus_spatula%29.JPG"],
            reportDescription: Des,
            reportStatus: "1",
            reportingUserID: "gay",
            reportSelection: cleanedReportSelection,
            userId: "65e226c76685873d32bd9fcb"
        }
    });
}

export async function getusername(searchid: string) {
    try{
        const usersWithThisid= await prisma.user.findMany({
            where: {
                product: {
                    some: {
                        id: searchid,
                    },
                },
            },
        });
          const username = usersWithThisid.map(i => i.name);
          console.log(username);
          return username
    }
    catch (error) {
        // Handle errors
        console.error('Error fetching user with product name:', error);
        throw error;
      }
}


export async function getproduct(searchid: string) {
    try{
        const products = await prisma.product.findFirst({
            where: {
              id:searchid
            },
          });
          return products
    }
    catch (error) {
        // Handle errors
        console.error('Error fetching user with productimg:', error);
        throw error;
      }
}



