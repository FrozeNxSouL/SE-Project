"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Transaction } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/router";
import { BiBuilding } from "react-icons/bi";
import OrderItem from "./OrderItem";
interface OrderDetailsProps {
  order: Transaction;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <h1 className="font-bold text-2xl">Order Details</h1>
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.totalPrice)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Payment status:</div>
        <div>
          {order.status === "pending" ? (
            <h1 className="bg-red-600 text-slate-50">pending</h1>
            
          ) : order.status === "complete" ? (
            <h1 className="bg-green-500 text-slate-50">completed</h1>
            
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.create_transaction_date).format('MMMM Do YYYY, h:mm:ss a')}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <div className="relative w-[70px]">
                Product
            </div>
        </div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-end font-semibold">Report</div>
        </div>
        {order.products && order.products.map(item => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
