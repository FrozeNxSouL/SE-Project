"use client";
import React, { useState } from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { categories } from "@/component/variables";

function AddProductPage() {
  const [auction, setAuction] = useState(false);
  const toggleForm = () => {

      setAuction(true)
    
  }
  const closeForm = () => {
      setAuction(false)

  }

  return (
    <div className="flex">
      <form action={addProduct} className="flex flex-col flex-wrap w-1/3 m-auto">
        <h1 className="text-lg font-bold">Add Product</h1>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            required
            name="name"
            className="grow bg-transparent"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 h-40">
          Description
          <textarea
            required
            name="description"
            className="grow h-40 p-3 bg-transparent"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Image URL
          <input
            required
            name="imageUrl"
            type="text" // Change type to "file" to allow multiple file selection
            multiple // Add the multiple attribute
            className="grow bg-transparent"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Price
          <input
            required
            name="price"
            type="number"
            className="grow bg-transparent text-right"
          />
          <kbd className="kbd kbd-sm">฿</kbd>
        </label>
        <div className="flex flex-col">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 btn-outline">category</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {categories.map((value, idx) => (
                <label className="label cursor-pointer justify-normal" key={idx}>
                  <input type="radio" name="tag" className="radio checked:bg-blue-500" value={value.label} />
                  <span className="label-text">{value.label}</span>
                </label>
              ))}
            </ul>
          </div>

          <div className="form-control w-28">
            <label className="label cursor-pointer">
              <input onClick={closeForm} type="radio" name="status" className="radio checked:bg-red-500" value="sell" />
              <span className="label-text">Selling</span>
            </label>
          </div>
          <div className="form-control w-28">
            <label className="label cursor-pointer">
              <input onClick={toggleForm} type="radio" name="status" className="radio checked:bg-blue-500" value="auction" />
              <span className="label-text">Auction</span>

            </label>
          </div>
        </div>

        {auction && (
          <label className="input input-bordered flex items-center gap-2">
            Due Time
            <input
              required
              name="Time"
              type="datetime-local"
              className="grow bg-transparent"
            />
          </label>
        )}

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
