"use client";
import axios from 'axios';
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import ActionBtn from "@/component/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];
  const router = useRouter()

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.tag,
        images: product.imageUrl,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(THB)",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-900">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Cateory", width: 220 },
    {
      field: "action",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        return <div className="flex justify-between gap-4 w-full">
          <ActionBtn icon={MdCached} onClick={()=>{}}/>
          <ActionBtn icon={MdDelete} onClick={()=>{
            handleDelete(params.row.id);
          }}/>
          <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
            router.push(`product/${params.row.id}`)
          }}/>
        </div>;
      },
    },
  ];
  const handleDelete = useCallback(async(id: string) =>{
    toast('Deleting product, please wait!')

    axios.delete(`/api/product/${id}`).then(
      (res) =>{
        toast.success("Product deleted");
        router.refresh();
      }).catch((err) =>{
        toast.error("Failed to delete product");
        console.log(err);
      })
  }, [])
  return (
    <div className="max-w-[1150x] m-auto text-2xl font-bold mb-20">
      <h1 className="mb-4  text-center">Product Manager</h1>
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

export default ManageProductsClient;
