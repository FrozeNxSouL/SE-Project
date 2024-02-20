import React from 'react'
import Link from "next/link";
import getProducts from '@/action/fetch';

export default async function HomePage() {
  const categories = [
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
  ]

  const products = await getProducts();
  console.log(products)

  return (
    <>
    <div className="bg-base-100 max-w-6xl mx-auto my-3">
      <h1 className="p-6 text-xl font-bold">หมวดหมู่</h1>
      <div className="join w-full flex justify-center">
        {categories.map((cat, idx)=> (
          <Link href={cat.id} className="flex flex-col btn btn-outline join-item w-28 h-28" key={idx}>
            <span className="material-icons">{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>

    <div className="bg-base-100 max-w-6xl mx-auto my-3">
      <h1 className="p-6 text-xl font-bold">สินค้าล่าสุด</h1>
      <div className="w-full flex flex-wrap gap-2 justify-center">
        {products.map((item, idx)=> (
          <div className="card w-60 bg-base-100 shadow-xl transition duration-150 ease-in-out hover:scale-105 cursor-pointer">
          <figure><img src={item.imageUrl} alt={item.name} /></figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              {/* <div className="badge badge-secondary">NEW</div> */}
            </h2>
            <p>{item.description}</p>
            {/* <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div> 
              <div className="badge badge-outline">Products</div>
            </div> */}
          </div>
        </div>
        ))}
      </div>
      
    </div>
    </>
    
  )
}