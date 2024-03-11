
"use client"
import { Product } from "@prisma/client";
import { useState, useEffect, useRef } from "react";

export default function shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const min = useRef<HTMLInputElement>(null)
    const max = useRef<HTMLInputElement>(null)

    const handleProductRequest = async ()=> {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/request/product?page=${currentPage}&min=${min.current?.value}&max=${max.current?.value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store"
        })
        if (res.ok) {
          const data = await res.json();
          setProducts(data.res)
          setMaxPage(data.maxPage)
        } else {
          console.error(`Request failed with status: ${res.status}`);
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=> {
      handleProductRequest();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage, ])

    const handleChangePage = async (type: string)=> {
      const newPage = (type === "+") ? currentPage+1 : currentPage-1;
      setCurrentPage(newPage)
    }

    return (
      <div className="flex flex-nowrap flex-row mx-auto max-w-screen-lg gap-5">
        <div className="flex flex-col gap-3 w-1/5">
          <div className="flex gap-2">
            <span className="material-icons">filter_alt</span>
            <h1 className="text-xl font-bold">Filter</h1>
          </div>
          <div className="w-full space-y-3">
            <h2>Price range</h2>
            <div className="flex gap-4">
              <input type="number" ref={min} placeholder="฿ min" className="input input-bordered input-sm w-full max-w-xs" />
              <span>-</span>
              <input type="number" ref={max} placeholder="฿ max" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <button className="btn btn-primary btn-block btn-sm" onClick={()=> handleProductRequest()}>APPLY</button>
          </div>
          <div className="divider"></div>
          <select className="select select-bordered select-md max-w-xs">
            <option value={3}>Sort: Latest</option>
            <option value={1}>Price: Low to High</option>
            <option value={2}>Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col items-center w-4/5">
          <div className="flex flex-wrap justify-center">
            {products.map((item, index)=> (
              <div key={index} className="bg-base-100 shadow-xl basis-60 m-2 transition cursor-pointer hover:ring-1 ring-primary w-56">
                  <figure>
                      <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                  </figure>
                  <div className="card-body p-5 bg-base-100">
                      <div className="flex flex-wrap gap-2">
                          {item.tag.map((t, idx)=> (
                              <div key={idx} className="badge badge-outline">{t}</div>
                          ))}
                          
                      </div>
                      <div className="card-title truncate overflow-hidden max-w-60">{item.name}</div>
                      <div className="card-actions justify-end">
                          <div>
                              <p className="text-primary text-xl">฿ {item.price}</p>
                          </div>
                      </div>
                  </div>
              </div>
            ))}
          </div>
          <div className="join">
            <button className="join-item btn btn-primary" onClick={()=> handleChangePage("-")} disabled={currentPage === 1}>«</button>
            <button className="join-item btn btn-primary">Page {currentPage}</button>
            <button className="join-item btn btn-primary" onClick={()=> handleChangePage("+")} disabled={currentPage === maxPage}>»</button>
          </div>
        </div>
        
      </div>
      
    )
  }
  