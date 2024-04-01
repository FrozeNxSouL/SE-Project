"use client";
import axios from 'axios';
import moment from 'moment';
import { Transaction, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import ActionBtn from "@/component/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";  
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OrdersClientProps {
  orders: ExtendedOrder[] | undefined;
}

type ExtendedOrder = Transaction & {
    user: User | null
}

const OrdersClient: React.FC<OrdersClientProps> = ({
  orders,
}) => {
  let rows: any = [];
  const router = useRouter();

  if (orders) {
    rows = orders
        .filter(order => order.status === 'complete') // Filter orders with status 'Completed'
        .map((order) => {
            return {
                id: order.id,
                customer: order.user?.name,
                amount: formatPrice(order.totalPrice),
                paymentStatus: order.status,
                date: moment(order.create_transaction_date).fromNow(),
                deliverStatus: order.deliveryStatus,
            };
        });
}

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "customer", headerName: "Customer Name", width: 220 },
    {
      field: "amount",
      headerName: "Amount(THB)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-900">{params.row.amount}</div>
        );
      },
    },
    {
        field: "paymentStatus",
        headerName: "Payment Status",
        width: 250,
        renderCell(params) {
            return (
                <div>
                    {params.row.paymentStatus === 'pending' ? (
                        <h1>Pending</h1>
                    ): params.row.paymentStatus === 'complete' ? (
                        <h1>Completed</h1>
                    ): (
                        <></>
                    )}
                </div>
            )
        },  
    },
    {
        field: "date",
        headerName: "Date",
        width: 250,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return <div className="flex justify-between gap-4 w-full">

          <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
            router.push(`/order/${params.row.id}`)
          }}/>
        </div>;
      },
    },
  ];
  return (
    <div className="max-w-[1150x] m-auto text-2xl font-bold mb-20">
      <h1 className="mb-4  text-center">Order Lists</h1>
      <div style={{height: 600, width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
