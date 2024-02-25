"use client";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { categories } from "@/component/variables";

function AddProductPage() {
  return (
    <div className="p-4 max-w-7xl m-auto">
      <h1 className="text-lg bg-purple-300 font-bold">Add Product</h1>
      <form action={addProduct} className="flex flex-wrap justify-center">
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
          type="text" // Change type to "file" to allow multiple file selection
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

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">category</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {categories.map((value, idx) => (
              <label className="label cursor-pointer justify-normal" key={idx}>
                <input type="radio" name="tag" className="radio checked:bg-blue-500" value={value.label} />
                <span className="label-text">{value.label}</span>
              </label>
            ))}
          </ul>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="radio" name="status" className="radio checked:bg-red-500" value="sell" />
            <span className="label-text">Selling</span>

          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <input type="radio" name="status" className="radio checked:bg-blue-500" value="auction" />
            <span className="label-text">Auction</span>

          </label>
        </div>

        <FormSubmitButton
          className="btn-block"
        >
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
