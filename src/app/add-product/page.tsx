"use server"

import getCategory from "../action/getCategory";
import AddProductForm from "./addProductForm";


export default async function AddProductPage() {
  const categoryInput = await getCategory();
"use client";
import React, { useState } from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { categories } from "@/component/variables";
import { Product } from "@prisma/client";


function AddProductPage() {
  const [auction, setAuction] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);


  const handleName = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setName(e.target.value)
  }
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
    setDescription(e.target.value)
  }
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setPrice(parseFloat(e.target.value))
  }
  const handleProductType = ()=> {
    setAuction(!auction);
  }
  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    setCategory(e.target.value)
  }
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setTime(e.target.value ?? null)
  }
  const handleRemoveImage = (idx: number)=> {
    const arr: string[] = productImage.filter((img, index) => index !== idx);
    setProductImage(arr)
  }
  const handleSubmit = ()=> {
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
    addProduct(newProduct, time);
  }
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Get the selected files
    try {
      applyImage(files);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const applyImage = (files: FileList | null)=> {
    if (files) {
      if (files.length > 5) {
        throw new Error("Can't upload image more than 5");
      }
      const newFileDataUrls: string[] = [];
      const readers: FileReader[] = [];
      for (let i = 0; i < files.length; i++) {
        console.log(files[i].size);
        if (files[i].size > 200000) {
          throw new Error(`Image number ${i+1} is too big (under 200kb)`);
        }

        const reader = new FileReader();
        readers.push(reader);
        reader.onload = (e) => {
          if (e.target) {
            const dataUrl = e.target.result as string;
            newFileDataUrls.push(dataUrl);
            
            if (newFileDataUrls.length === files.length) {
              setProductImage(newFileDataUrls);
            }
          }
        };
        reader.readAsDataURL(files[i]); // Read the file as a data URL
      }
    }
  }

  return (
      <div className="mx-auto max-w-screen-lg min-h-screen bg-base-100">
        <div className="w-full p-10 space-y-2">
          {error && (
              <div role="alert" className="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{error}</span>
                  <div>
                      <button className="btn btn-error btn-sm" onClick={()=> {setError(null)}}><span className="material-icons">close</span></button>
                  </div>
              </div>
          )}
          <div className="divider text-xl font-bold">Create new product</div>
          <div className="flex flex-wrap justify-center gap-3">
              <div className="cursor-pointer size-32 bg-base-200 transition hover:ring-1 hover:ring-primary rounded-md">
                <input type="file" onChange={handleFileSelect} className="absolute size-32 opacity-0 cursor-pointer" accept="image/jpeg" multiple/>
                <div className="w-full h-full z-1 flex flex-col justify-center items-center">
                  <button className="btn btn-outline btn-sm">Browse</button>
                  <span className="text-center">Drag and drop</span>
                </div>
              </div>
              {productImage.map((image, index)=> (
                  <div className="size-32 rounded-lg" key={index}>
                      <button className="btn btn-error size-32 opacity-0 hover:opacity-70 absolute active:ring ring-opacity-100 ring-error" onClick={()=> handleRemoveImage(index)}>
                        <span className="material-icons">delete</span>
                      </button>
                      <img className="object-cover size-full rounded-lg" src={image} />
                  </div>
              ))}
        </div>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input required name="name" className="grow bg-transparent" onChange={handleName}/>
          </label>
          <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Product description" onChange={handleDescription} required></textarea>
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input required name="price" type="number" step={0.01} className="grow bg-transparent text-right" onChange={handlePrice}/>
            <kbd className="kbd kbd-sm">฿</kbd>
          </label>
          <div className="flex flex-col">
            <select className="select select-bordered w-full" onChange={handleCategory} defaultValue={"none"}>
              <option disabled value="none">Category</option>
              {categories.map((value, idx) => (
                <option key={idx} value={value.label}>{value.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between gap-5">
            <div className="form-control w-52">
              <label className="cursor-pointer label">
                <span className="label-text">Place in auction</span> 
                <input name="status" type="checkbox" className="toggle toggle-primary" checked={auction} onChange={handleProductType}/>
              </label>
            </div>
              {auction && (
                <label className="input input-bordered input-primary flex items-center gap-2 grow">
                  Due Time
                  <input required name="Time" type="datetime-local" className="grow bg-transparent" onChange={handleTime} />
                </label>
              )}
          </div>
          <button className="btn btn-primary btn-block" onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
  );
}

export default AddProductPage;
    <>
      <AddProductForm data={categoryInput}/>
    </>
  )
}

