import React from 'react'
import Link from "next/link";
import {getProducts,getAuctionProduct} from '@/api/action/fetch';
import { categories } from '../component/variables'
// import getAuctionProduct from '@/api/action/getAuctionProduct';

export default async function HomePage() {
  function slider() {
    const container = document.getElementById('cat-slider')
    container?.scrollBy({
      left: -20,
      behavior: "smooth"
    })
  }
  const products = await getProducts();

  const auctionProduct = await getAuctionProduct();

  return (
    <div className='mx-auto flex justify-center flex-col bg-base-100 w-2/3 px-32'>
      {/* {auctionProduct.map((value, idx) => (
        <div className="card lg:card-side bg-base-100 shadow-xl my-3" key={idx}>
          <figure><img src={value.imageUrl[0]} className='h-72 w-72' /></figure>
          <div className="card-body flex flex-row justify-between items-center">
            <div className='basis-1/3'>
              <h2 className="card-title text-5xl font-bold my-9">{value.name}</h2>
              <p>{value.description}</p>
              <p>expire time : 15.00</p>
              <div className="badge badge-outline my-5">cunnyman</div>
            </div>
            <div className='flex flex-col items-center basis-1/3'>
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max my-8">
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 15 }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 10 }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 24 }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 32 }}></span>
                  </span>
                  sec
                </div>
              </div>
              <h3 className='tracking-widest text-lg'>NOW</h3>
              <h3 className='text-3xl tracking-widest'>{value.price} ฿</h3>
            </div>

            <div className="card-actions flex flex-col items-center basis-1/3">
              <button className="btn w-48">Get</button>
            </div>
          </div>
        </div>
      ))} */}

      <div>
        <h3 className='flex text-2xl'>Category</h3>
        <div className="flex">
          <div id="cat-slider" className='flex flew-row flex-nowrap cursor-grab overflow-scroll gap-2 w-full [&::-webkit-scrollbar]:hidden'>
            {categories.map((cat, idx) => (
              <Link href={cat.id} className="flex flex-col btn btn-outline join-item w-24 h-24" key={idx}>
                <span className="material-icons">{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <div className="w-full">
        <h3 className='flex text-2xl'>Latest products</h3>
        <div className='flex flex-wrap justify-center'>
          {products.map((item, idx) => (
            <div className="card bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:scale-[1.01]" key={idx}>
              <figure>
                <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
              </figure>
              <div className="card-body p-5 bg-base-100">
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-primary">NEW</div>
                  <div className="badge badge-outline">{item.tag}</div>
                </div>
                <div className="card-title overflow-hidden whitespace-nowrap max-w-60">{item.name}</div>
                <div className="card-actions justify-end">
                  <div>
                    <p className="text-primary text-xl">฿ {item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div >

  )
}