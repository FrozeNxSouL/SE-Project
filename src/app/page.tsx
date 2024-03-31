import React from 'react'
import Link from "next/link";
import { getProducts, getAuctionProduct, requestProducts } from '@/api/action/fetch';
import LatestProducts from '@/component/panel/latestProduct';
import AuctionProducts from '@/component/panel/auction';
import getCategory from './action/getCategory';
import CategoryList from '@/component/panel/category';
// import getAuctionProduct from '@/api/action/getAuctionProduct';

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const auctionProduct = await getAuctionProduct();
  const request: requestProducts = {
    keyword: null,
    page: 1,
    price: {
      min: 0,
      max: 0,
    },
    quantity: 9,
    sort: "asc"
  } 
  const products = await getProducts(request);
  const category = await getCategory();

  return (
    <div className='mx-auto flex justify-center flex-col gap-5 bg-base-100 max-w-screen-xl px-32'>
      <CategoryList data={category} />
      <div className="divider text-2xl font-bold">End soon</div>
      <AuctionProducts data={auctionProduct}/>
      <div className="divider text-2xl font-bold">Latest Products</div>
      {products.list.length > 0 ? (
        <LatestProducts data={products.list} />
      ) : (
        <p>No products available.</p>
      )}
    </div >

  )
}