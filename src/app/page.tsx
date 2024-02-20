import React from 'react'
import Link from "next/link";

function HomePage() {
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

    {/* <div className="bg-base-100 max-w-6xl mx-auto my-3">
      <h1 className="p-6 text-xl font-bold">สินค้าล่าสุด</h1>
      <div className="join w-full flex justify-center">
        {}
      </div>
    </div> */}
    </>
    
  )
}

export default HomePage