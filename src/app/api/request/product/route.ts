import { NextResponse } from "next/server"
import prisma from "@/lib/db/prisma"

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams

    const page = parseInt(params.get("page") || "1", 10)
    const keyword = params.get("search") || ""
    const sort = params.get("sort") || ""
    const min = parseFloat(params.get("min") || "0")
    const max = parseFloat(params.get("max") || "0")
    const tag = params.get("tag") || ""

    try {
        const where: any = {};
        const orderBy: any = {};

        if (min || max) {
            where.price = {
                gte: min,
                lte: max
            }
        }
        if (keyword) {
            where.name = {
                contains: keyword,
                mode: 'insensitive',
            }
        }
        if (sort !== "") {
            orderBy.price = sort === "asc" ? "asc" : "desc";
        }

        const skip: number = (page) ? (page - 1) * 20 : 0

        const res = await prisma.product.findMany({
            take: 20,
            orderBy,
            skip,
            where,
        })

        const count = await prisma.product.count()

        return NextResponse.json({
            page: page,
            maxPage: Math.ceil(count / 20),
            res
        })
    } catch (error) {
        console.log(error)
    }


    return NextResponse.json({error: 'Unauthorized'})
}