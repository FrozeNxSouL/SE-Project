"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createReport(Des: string,reportSelection: (string | null)[],me:string|undefined,reportwho:string|undefined ,reportpic:string[]) {

    if(!me){
        throw Error;
    }

    const cleanedReportSelection = reportSelection.filter(value => value !== null) as string[];
    await prisma.report.create({
        data:{
            reportPicture: reportpic,
            reportDescription: Des,
            reportStatus: "1",
            reportingUserID: me,
            reportSelection: cleanedReportSelection,
            userId: reportwho
        }
    });
}

export async function getproductanduser(searchid: string) {
    try{
        const usersWithThisid= await prisma.product.findFirst({
            where: {
                id:searchid
            },
            include:{
                User:true
            }
        });
        //   const username = usersWithThisid.map(i => i.name);
        //   console.log(username);
          return usersWithThisid
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



