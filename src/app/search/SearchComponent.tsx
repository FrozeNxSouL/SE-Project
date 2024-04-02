
"use client"
import { Product, Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { requestProducts, getProducts } from "@/api/action/fetch";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchComponentProps {
  tagList: Category[];
}

export default function SearchComponent({ tagList }: SearchComponentProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [maxPage, setMaxPage] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [sort, setSort] = useState("asc");

  const searchParams = useSearchParams();
  const searchKey = searchParams?.get("keyword");

  useEffect(() => {
    applyFilters();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [searchKey, sort, currentPage, tag, status]);

  const applyFilters = async () => {
    const request: requestProducts = {
      keyword: (searchKey == "") ? null : searchKey,
      quantity: 20,
      sort,
      price: {
        min,
        max,
      },
      page: currentPage,
      tag: (tag == "") ? null : [tag],
      status: (status == "all") ? null : status,
    }

    try {
      const res = await getProducts(request);
      setProducts(res.list)
      setMaxPage(Math.ceil(res.count / 21));
    } catch (error) {
      console.log(error)
    }
  }

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value)
    setMin((price >= 0) ? price : 0);
    setCurrentPage(1);
  }
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value)
    setMax((price < 999999) ? price : 999999);
  }
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (parseInt(e.target.value) == 1) {
      setSort("asc");
    } else {
      setSort("desc");
    }
    setCurrentPage(1);
  }

  const handleTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value);
    setCurrentPage(1);
  }
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  }

  const handlePageChange = (p: number) => {
    if (p == 1) {
      setCurrentPage((currentPage) => ++currentPage);
    } else {
      setCurrentPage((currentPage) => --currentPage);
    }
  }

  return (
    <div className="flex flex-col mx-auto max-w-screen-xl">
      <div className="flex flex-row flex-wrap justify-evenly p-2">
        <div className="w-72 space-y-3">
          <h2>Sort</h2>
          <select onChange={handleSort} className="select select-bordered select-md w-full">
            <option value={1}>Price: Low to High</option>
            <option value={2}>Price: High to Low</option>
          </select>
        </div>
        <div className="w-72 space-y-3">
          <h2>Tag</h2>
          <select className="select select-bordered select-md w-full" onChange={handleTag} defaultValue={""}>
            <option value={""}>No tag</option>
            {tagList?.map((t, index1) => (
              <option key={index1} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="w-72 space-y-3">
          <h2>Type</h2>
          <select className="select select-bordered select-md w-full" onChange={handleStatus} defaultValue={""}>
            <option value={""}>All</option>
            <option value={"sell"}>Product</option>
            <option value={"auction"}>Auction</option>
          </select>
        </div>
        <div className="w-72 space-y-3">
          <h2>Price range</h2>
          <div className="flex gap-4">
            <input onChange={handleMinPrice} type="number" placeholder="฿ min" className="input input-bordered input-xs w-1/2" />
            <span>-</span>
            <input onChange={handleMaxPrice} type="number" placeholder="฿ max" className="input input-bordered input-xs w-1/2" />
          </div>
          <button onClick={applyFilters} className="btn btn-primary btn-block btn-xs">APPLY</button>
        </div>
      </div>

      <div className="flex-grow-0">
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {products.map((item, index) => (
            <>
              {item.status == "sell" ? (
                <div onClick={() => router.push(`/product/${item.id}`)} key={index} className="bg-base-100 shadow-xl transition cursor-pointer hover:ring-1 ring-primary w-56">
                  <div className="absolute badge m-2 badge-primary">{item.status}</div>
                  <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                  <div className="card-body p-5 bg-base-100">
                    <span className="overflow-hidden max-w-60 truncate block font-bold">{item.name}</span>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-wrap gap-2">
                        {item.tag.map((t, idx) => (
                          <div key={idx} className="badge badge-outline">{t}</div>
                        ))}
                      </div>

                      <div>
                        <p className="font-semibold text-primary text-lg">฿ {item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div onClick={() => router.push(`/auction/${item.id}`)} key={index} className="bg-base-100 shadow-xl transition cursor-pointer hover:ring-1 ring-neutral w-56">
                  <div className="absolute badge m-2 badge-neutral">{item.status}</div>
                  <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
                  <div className="card-body p-5 bg-base-100">
                    <span className="overflow-hidden max-w-60 truncate block font-bold">{item.name}</span>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-wrap gap-2">
                        {item.tag.map((t, idx) => (
                          <div key={idx} className="badge badge-outline">{t}</div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral text-lg">฿ {item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
              }
            </>
          ))}
          {products.length === 0 && (
            <span className="text-xl font-bold">The product list is empty</span>
          )}
        </div>
        <div className="flex justify-center p-5">
          <div className="join">
            <button onClick={() => handlePageChange(0)} className="join-item btn btn-accent" disabled={currentPage <= 1}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button onClick={() => handlePageChange(1)} className="join-item btn btn-accent" disabled={currentPage >= maxPage}>»</button>
          </div>
        </div>

      </div>

    </div>

  )
}
