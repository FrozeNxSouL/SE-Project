"use server"

import getCategory from "../action/getCategory";
import AddProductForm from "./addProductForm";


export default async function AddProductPage() {
  const categoryInput = await getCategory();

  return (
    <>
      <AddProductForm data={categoryInput} />
    </>
  )
}

