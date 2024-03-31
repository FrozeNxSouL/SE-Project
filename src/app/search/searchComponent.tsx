"use client"
import { Product } from "@prisma/client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchItem } from "./search";

export default function Shop() {
    const searchParams = useSearchParams();
    const [productList, setProductList] = useState<Product[]>([]);

    const keyword = searchParams?.get("keyword");
    const tag = searchParams?.get("tag");
    const sort = searchParams?.get("sort");
    const maxPrice = searchParams?.get("maxPrice");
    const minPrice = searchParams?.get("minPrice");

    useEffect(()=> {
      getProduct();
    }, [])

    const getProduct = async ()=> {
        try {
          const res = await searchItem();
          setProductList(res);
        } catch (e) {
          console.log(e);
        }
    }


    return (
      <div className="flex flex-nowrap flex-col mx-auto max-w-screen-xl min-h-screen gap-5">
        <div className="flex flex-row justify-evenly w-full p-2">
          <div className="w-72">
            <div className="label">
              <span className="drop-shadow-lg">Search</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              <input type="text" className="grow bg-transparent" />
            </label>
          </div>
          <div className=" w-72">
            <div className="label">
              <span className="drop-shadow-lg">Price</span>
            </div>
            <select className="select select-bordered w-full">
              <option>Who shot first?</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="w-72">
            <div className="label">
              <span className="drop-shadow-lg">Range</span>
            </div>
            <div className="flex flex-row gap-3">
              <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
              <span className="text-xl font-bold">-</span>
              <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
          </div>
        </div>


        <div className="flex flex-wrap gap-5 w-full min-h-screen">
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
          <div className="w-60 h-72 ring ">
            asd
          </div>
        </div>
      </div>
      
    )
  }
  