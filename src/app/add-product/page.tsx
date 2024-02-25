"use client";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";

function AddProductPage() {
  return (
    <div className="p-4 max-w-7xl m-auto">
      <h1 className="text-lg bg-purple-300 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-2 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-2 w-full"
        />
        <input
          required
          name="imageUrl"
          type="file" // Change type to "file" to allow multiple file selection
          multiple // Add the multiple attribute
          placeholder="Image URL"
          className="input-bordered input mb-2 w-full"
          
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-2 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
