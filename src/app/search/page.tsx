
"use client"
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { requestProducts, getProducts } from "@/api/action/fetch";
import { useRouter, useSearchParams } from "next/navigation";

export default function shop() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [sort ,setSort] = useState("asc");

    const searchParams = useSearchParams();
    const searchKey = searchParams?.get("keyword");

    useEffect(()=> {
      applyFilters();
      window.scrollTo(0, 0);
    }, [, sort, currentPage]);

    const applyFilters = async ()=> {
      const request: requestProducts = {
        keyword: (searchKey == "") ? null : searchKey,
        quantity: 21,
        sort,
        price: {
          min,
          max,
        },
        page: currentPage,
      }

      try {
        const res = await getProducts(request);
        setProducts(res.list)
        setMaxPage(Math.ceil(res.count / 21));
      } catch (error) {
        console.log(error)
      }
    }

    const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>)=> {
      const price = parseInt(e.target.value)
      setMin((price >= 0) ? price : 0);
    }
    const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>)=> {
      const price = parseInt(e.target.value)
      setMax((price < 999999) ? price : 999999);
    }
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>)=> {
      if (parseInt(e.target.value) == 1) {
        setSort("asc");
      } else {
        setSort("desc");
      }
    }

    const handlePageChange = (p: number)=> {
      if (p == 1) {
        setCurrentPage((currentPage)=> ++currentPage);
      } else {
        setCurrentPage((currentPage)=> --currentPage);
      }
    }

    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-1 mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center gap-3 p-5">
          <div className="flex gap-2 w-full">
            <span className="material-icons">filter_alt</span>
            <h1 className="text-xl font-bold">Filter</h1>
          </div>
          <div className="w-full space-y-3">
            <h2>Price range</h2>
            <div className="flex gap-4">
              <input onChange={handleMinPrice} type="number" placeholder="฿ min" className="input input-bordered input-sm w-1/2" />
              <span>-</span>
              <input onChange={handleMaxPrice} type="number" placeholder="฿ max" className="input input-bordered input-sm w-1/2" />
            </div>
            <button onClick={applyFilters} className="btn btn-primary btn-block btn-sm">APPLY</button>
          </div>
          <div className="divider"></div>
          <select onChange={handleSort} className="select select-bordered select-md w-full">
            <option value={1}>Price: Low to High</option>
            <option value={2}>Price: High to Low</option>
          </select>
        </div>

        <div className="w-full md:col-span-3 sm:col-span-1">
          <div className="flex flex-wrap gap-5 pt-5 pl-5 w-full">
            {products.map((item, index)=> (
              <div onClick={() => router.push(`/product/${item.id}`)} key={index} className="bg-base-100 shadow-xl transition cursor-pointer hover:ring-1 ring-primary w-56">
                  <figure>
                      <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                  </figure>
                  <div className="card-body p-5 bg-base-100">
                      <div className="flex flex-wrap gap-2">
                          {item.tag.map((t, idx)=> (
                              <div key={idx} className="badge badge-outline">{t}</div>
                          ))}
                          
                      </div>
                      <div className="card-title overflow-hidden max-w-60"><span className="truncate">{item.name}</span></div>
                      <div className="card-actions justify-end">
                          <div>
                              <p className="text-primary text-xl">฿ {item.price}</p>
                          </div>
                      </div>
                  </div>
              </div>
            ))}
            {products.length === 0 && (
              <span className="text-xl font-bold">The product list is empty</span>
            )}
          </div>
          <div className="flex justify-center p-5">
            <div className="join">
              <button onClick={()=> handlePageChange(0)} className="join-item btn btn-primary" disabled={currentPage <= 1}>«</button>
              <button className="join-item btn btn-primary">Page {currentPage}</button>
              <button onClick={()=> handlePageChange(1)} className="join-item btn btn-primary" disabled={currentPage >= maxPage}>»</button>
            </div>
          </div>
          
        </div>
        
      </div>
      
    )
  }
  