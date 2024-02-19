"use client";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import addProduct from "./add";

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
          type="url"
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
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Normal product</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-red-500"
              checked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Auction product</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              checked
            />
          </label>
        </div>
        <button
          className="btn btn-primary btn-block mt-3 min-w-[300px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
