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
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 justify-center bg-base-100 p-5 rounded-md">
      <div className="divider text-2xl font-bold">Order details</div>
      <div className="w-1/2">
        <table className="table">
          <tr>
            <td>Order ID</td>
            <td>{order.id}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>{formatPrice(order.totalPrice)}</td>
          </tr>
          <tr>
            <td>Payment status</td>
            <td>{order.status === "pending" ? (
              <h1 className="badge bg-red-600 text-slate-50">Pending</h1>
              
            ) : order.status === "complete" ? (
              <h1 className="badge bg-green-500 text-slate-50">Completed</h1>
              
            ) : (
              <></>
            )}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{moment(order.create_transaction_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
          </tr>
        </table>
      </div>
      
      <div className="flex flex-col w-full ring-1 p-5 ring-primary">
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <div className="relative w-[70px]">
                Product
            </div>
        </div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-end font-semibold">Report</div>
        <div className="justify-self-end font-semibold">Score</div>
        </div>
        {order.products && order.products.map(item => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
