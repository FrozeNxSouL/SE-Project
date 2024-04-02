import { getCurrentSession } from "@/lib/getCurrentSession"
import SellerClient from "./sellerClient"

export default async function Sell() {
  const session = await getCurrentSession()


  return (
    <>
      <div className="divider text-2xl font-bold my-10">Manage Your Order</div>
      <SellerClient />
    </>
  )
}
