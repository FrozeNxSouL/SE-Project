"use client";
import React, { useEffect, useState } from "react";
import addProduct from "./add";
import FormSubmitButton from "@/component/nav/FormSubmitButton";
import { Product } from "@prisma/client";
import getCategory from "../action/getCategory";


function AddProductForm(props: any) {
    const categoryInput = props.data

    const [auction, setAuction] = useState(false);
    const [time, setTime] = useState<string | null>(null);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imageField, setImageField] = useState("");
    const [productImage, setProductImage] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);


    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 64) {
            setName(e.target.value);
        }
    }
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 160) {
            setDescription(e.target.value);
        }
    }
    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(e.target.value))
    }
    const handleProductType = () => {
        setAuction(!auction);
    }
    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }
    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value ?? null)
    }

    const handleImageURL = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setImageField(e.target.value);
    }
    const handleAddImage = ()=> {
        if (productImage.length == 5) {
            setError("Cannot upload more than 5 images");
        } else {
            const newImage: string[] = [...productImage];
            newImage.push(imageField);
            setProductImage(newImage);
        }

    }
    const handleRemoveImage = (idx: number)=> {
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
            userId: "",
            score: 0
        }
        try {
            addProduct(newProduct, time);
        } catch (e: any) {
            setError(e.message);
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
                            <button className="btn btn-error btn-sm" onClick={() => { setError(null) }}><span className="material-icons">close</span></button>
                        </div>
                    </div>
                )}
                <div className="divider text-xl font-bold">Create new product</div>
                <div className="flex flex-wrap justify-center gap-3">
                {productImage.map((image, index) => (
                    <div className="size-32 rounded-lg" key={index}>
                        <button className="btn btn-error size-32 opacity-0 hover:opacity-70 absolute active:ring ring-opacity-100 ring-error" onClick={() => handleRemoveImage(index)}>
                            <span className="material-icons">delete</span>
                        </button>
                        <img className="object-cover size-full rounded-lg" src={image} />
                    </div>
                ))}
                </div>
                <div className="join w-full">
                    <label className="input input-bordered flex items-center gap-2 join-item w-full">
                        Image
                        <kbd className="kbd kbd-sm"><span className="material-icons">link</span></kbd>
                        <input required name="name" className="grow bg-transparent" onChange={handleImageURL} />
                    </label>
                    <button className="btn btn-primary join-item" onClick={handleAddImage}>Click to add</button>
                </div>
                
                <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input required name="name" className="grow bg-transparent" maxLength={64} onChange={handleName} />
                    <kbd className="kbd kbd-sm">{name.length}</kbd>
                </label>
                <textarea name="description" className="textarea textarea-bordered w-full h-40" maxLength={160} placeholder="Product description" onChange={handleDescription} required></textarea>
                <label className="input input-bordered flex items-center gap-2">
                    Price
                    <input required name="price" type="number" step={0.01} className="grow bg-transparent text-right" onChange={handlePrice} />
                    <kbd className="kbd kbd-sm">฿</kbd>
                </label>
                <div className="flex flex-row gap-3 items-center">
                    <select className="select select-bordered w-full" onChange={handleCategory} defaultValue={""}>
                        <option disabled value="">Category</option>
                        {categoryInput.map((value: any, idx: number) => (
                            <option key={idx} value={value.name}>{value.name}</option>
                        ))}
                    </select>
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
                </div>
                <button className="btn btn-primary btn-block" onClick={handleSubmit}>Add Product</button>
            </div>
        </div>
    );
}

export default AddProductForm;
