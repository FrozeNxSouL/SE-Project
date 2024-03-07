import { getProducts } from "@/api/action/fetch"
import Listings from "./listings"
import prisma from "@/lib/prismaDB"

export default async function shop() {
    const products = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    return (
      <div className="flex flex-nowrap flex-row mx-auto max-w-screen-lg gap-5">
        <div className="flex flex-col gap-3 min-w-56">
          <div className="flex gap-2">
            <span className="material-icons">filter_alt</span>
            <h1 className="text-xl font-bold">Filter</h1>
          </div>
          <div className="w-full space-y-3">
            <h2>Price range</h2>
            <div className="flex gap-4">
              <input type="text" placeholder="฿ min" className="input input-bordered input-sm w-full max-w-xs" />
              <span>-</span>
              <input type="text" placeholder="฿ max" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <button className="btn btn-primary btn-block btn-sm">APPLY</button>
          </div>
          <div className="divider"></div>
        </div>

        <div>
          <div className="bg-base-100 mb-5 p-3 flex justify-between">
            <div className="flex gap-5 items-center">
              <h2>Sort</h2>
              <button className="btn btn-ghost">poon</button>
              <button className="btn btn-ghost">za</button>
              <button className="btn btn-ghost">555</button>
              <button className="btn btn-ghost">+</button>
            </div>
            <div className="items-center">
              <select className="select select-bordered select-sm max-w-xs">
                <option disabled selected>Price</option>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
            </div>
          </div>
          <Listings data={products} />
        </div>
        
      </div>
      
    )
  }
  