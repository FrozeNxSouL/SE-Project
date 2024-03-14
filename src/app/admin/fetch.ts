"use server"
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


export async function getManage() {
    const list = await prisma.management.findFirst({
        include: {
            categorys: true,
        }
    });
    return list
}

export async function changeTax(newtax: number) {
    try {
        const list = await prisma.management.update({
            where: {
                id: "65decc90137f28b543937afb"
            },
            data: {
                tax: newtax,
            }
        })
    } catch (error) {
        console.log(error)
    }

}

export async function tagAdd(addname: string, addurl: string, adminid: string) {
    const list = await prisma.category.create({
        data: {
            name: addname,
            url: addurl,
            managementId: adminid
        }
    })
}

export async function editTag(catid: string, catname: string, caturl: string) {
    const list = await prisma.category.update({
        where: {
            id: catid
        },
        data: {
            name: catname,
            url: caturl
        }
    })
}

export async function deleteTag(catid: string) {
    const list = await prisma.category.delete({
        where: {
            id: catid
        }
    })
}

export async function getUser(usersearch: string) {
    try {
        const list = await prisma.user.findMany({
            include: {
                // report: true,
                report: { where: { reportStatus: "1" } }
            },
            where: {
                AND: [
                    { name: { contains: usersearch } },
                    // { report: { some: {} } }
                    {
                        report: {
                            some: {
                                reportStatus: "1"
                            }
                        }
                    }
                ]
            }
        })
        revalidatePath("/admin")
        return list
    } catch (error) {
        return []
    }
}

export async function deleteUser(userid: string) {
    await prisma.user.update({
        where: {
            id: userid
        },
        data: {
            role: "deleted"
        }
    })
}

export async function statusReport(reportid: string) {
    await prisma.report.update({
        where: {
            id: reportid
        },
        data: {
            reportStatus: "0"
        }
    })

}
