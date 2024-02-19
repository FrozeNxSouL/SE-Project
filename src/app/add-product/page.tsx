import  prisma  from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

async function addProduct(formData: FormData) {
    "use server";
    
    const name = formData.get("name")?.toString();
    const description =formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0)

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: {name,description,imageUrl,price},
    });

    redirect("/");
}
function AddProductPage() {
    return (
        <div className='p-4 max-w-7xl m-auto'>
            <h1 className='text-lg bg-purple-300 font-bold'>Add Product</h1>
            <form action = {addProduct}>
                <input
                    required
                    name="name"
                    placeholder="Name" className="input-bordered input mb-2 w-full"
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
                    placeholder="Image URL" className="input-bordered input mb-2 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input-bordered input mb-2 w-full"
                />
                <button className="btn btn-primary btn-block mt-3 min-w-[300px]" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProductPage