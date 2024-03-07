"use client";
import React, { useState } from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { categories } from "@/component/variables";

function AddProductPage() {
  const [auction, setAuction] = useState(false);

  const handleProductType = ()=> {
    setAuction(!auction);
  }

  return (
      <div className="mx-auto max-w-screen-lg min-h-screen bg-base-100">
        <form action={addProduct} className="w-full p-10 space-y-2">
          <div className="divider text-xl font-bold">Create new product</div>
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
            <input required name="imageUrl" type="text" multiple  className="grow bg-transparent"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Price
            <input required name="price" type="number" step={0.01} className="grow bg-transparent text-right"
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
            <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text">Place in auction</span> 
                  <input name="status" type="checkbox" className="toggle toggle-primary" checked={auction} onChange={handleProductType}/>
                </label>
              </div>
          </div>

          {auction && (
            <label className="input input-bordered flex items-center gap-2">
              Due Time
              <input required name="Time" type="datetime-local" className="grow bg-transparent"
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
