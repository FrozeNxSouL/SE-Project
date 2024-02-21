import React from 'react'
import Link from "next/link";
import {getProducts,getAuctionProduct} from '@/api/action/fetch';
import { categories } from '../component/variables'
// import getAuctionProduct from '@/api/action/getAuctionProduct';

export default async function HomePage() {

  const products = await getProducts();
  console.log(products)

  const auctionProduct = await getAuctionProduct();

  return (
    <div className='flex justify-center flex-col w-full bg-black px-32'>
      {auctionProduct.map((value, idx) => (
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
      ))}

      <h3 className='flex text-2xl'>Category</h3>
      <div className='flex flew-row justify-evenly w-full h-max'>
        {categories.map((cat, idx) => (
          <Link href={cat.id} className="flex flex-col btn btn-outline join-item w-28 h-28" key={idx}>
            <span className="material-icons">{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>

      <div>
        <p>product group</p>
        <h3 className='flex text-2xl'>type</h3>
        <div className='flex flex-wrap justify-center'>
          {products.map((item, idx) => (
            <div className="card w-96 bg-base-100 shadow-xl basis-72 m-2" key={idx}>
              <figure><img src={item.imageUrl[0]} alt={item.name} className='w-64 h-48' /></figure>
              <div className="card-body bg-slate-800">
                <div className="badge badge-outline">{item.tag}</div>
                <h2 className="card-title">
                  {item.name}
                </h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <div>
                    <p className="text-primary text-3xl">฿ {item.price}</p>
                  </div>
                </div>
                <button className="btn">Buy</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div >

  )
}