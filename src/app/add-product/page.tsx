"use client";
import React, { useState, useEffect } from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { categories } from "@/component/variables";
import { Product } from "@prisma/client";
import getCategory from "../action/getCategory";
import { Category } from "@prisma/client";


function AddProductPage() {
  const [auction, setAuction] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState<string[]>([]);
  const [imageField, setImageField] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value))
  }
  const handleProductType = () => {
    setAuction(!auction);
  }
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value ?? null)
  }
  const handleImageField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageField(e.target.value)
  }
  const handleAddImage = () => {
    if (imageField !== "") {
      const arr: string[] = [...productImage];
      arr.push(imageField);
      setProductImage(arr)
    }
  }
  const handleRemoveImage = (idx: number) => {
    const arr: string[] = productImage.filter((img, index) => index !== idx);
    setProductImage(arr)
  }
  const handleSubmit = () => {
    const newProduct: Product = {
      id: "",
      name,
      description,
      price,
      imageUrl: productImage,
      status: (auction) ? "auction" : "sell",
      tag: [category],
      transactionId: null,
      userId: null
    }
    addProduct(newProduct, time)
  }

  return (
    <div className="mx-auto max-w-screen-lg min-h-screen bg-base-100">
      <div className="w-full p-10 space-y-2">
        <div className="divider text-xl font-bold">Create new product</div>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input required name="name" className="grow bg-transparent" onChange={handleName} />
        </label>
        <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Product description" onChange={handleDescription} required></textarea>
        <label className="input input-bordered flex items-center gap-2">
          Price
          <input required name="price" type="number" step={0.01} className="grow bg-transparent text-right" onChange={handlePrice} />
          <kbd className="kbd kbd-sm">฿</kbd>
        </label>
        <div className="flex flex-col">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 btn-outline">category</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {categories.map((value, idx) => (
                <label className="label cursor-pointer justify-normal" key={idx}>
                  <input type="radio" name="tag" className="radio checked:bg-blue-500" value={value.label} onChange={handleCategory} />
                  <span className="label-text">{value.label}</span>
                </label>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-5">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Place in auction</span>
              <input name="status" type="checkbox" className="toggle toggle-primary" checked={auction} onChange={handleProductType} />
            </label>
          </div>
          {auction && (
            <label className="input input-bordered input-primary flex items-center gap-2 grow">
              Due Time
              <input required name="Time" type="datetime-local" className="grow bg-transparent" onChange={handleTime} />
            </label>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {productImage.map((image, index) => (
            <div className="size-28 rounded-lg" key={index}>
              <button className="btn btn-error size-28 opacity-0 hover:opacity-70 absolute active:ring ring-opacity-100 ring-error" onClick={() => handleRemoveImage(index)}>
                <span className="material-icons">delete</span>
              </button>
              <img className="object-cover size-full rounded-lg" src={image} />
            </div>
          ))}
        </div>
        <div className="join w-full">
          <input required name="imageUrl" type="text" className="input input-bordered w-full join-item" placeholder="Image url" onChange={handleImageField} />
          <button className="btn btn-outline join-item" onClick={handleAddImage}>Save</button>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
}

export default AddProductPage;
