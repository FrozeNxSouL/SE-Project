import { getCurrentSession } from "@/lib/getCurrentSession"
import SellerClient from "./sellerClient"
import { getCompletedProduct, getOrderProduct, getPendingProduct } from "@/api/action/fetch";

export default async function Sell() {
  const session = await getCurrentSession()
  const output1 = await getOrderProduct(session?.user.id||"");
  const output2 = await getPendingProduct(session?.user.id||"");
  const output3 = await getCompletedProduct(session?.user.id||"");
  return (
    <div className="flex flex-col w-full">
      <div className="divider text-2xl font-bold my-10">Manage Your Order</div>
      <SellerClient session={session} order={output1} pending={output2} complete={output3}/>
    </div>
  )
}
