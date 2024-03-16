"use client";
import { Transaction, User } from "@prisma/client";
import { formatPrice } from "@/utils/formatPrice";

interface OrdersClientProps {
  orders: ExtendedOrder[] | undefined;
}

type ExtendedOrder = Transaction & {
    user: User | null
}

const OrdersClient: React.FC<OrdersClientProps> = ({
  orders,
}) => {

  return (
    <div className="max-w-screen-xl m-auto bg-base-100">
      <div className="w-full min-h-full p-5">
      <h1 className="divider text-xl font-bold">Order Lists</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index)=> (
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.products[0].img[0]} alt={order.products[0].name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.products[0].name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td>{order.status}</td>
                  <td>{(order.create_transaction_date).toDateString()}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </tfoot>
            
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersClient;
