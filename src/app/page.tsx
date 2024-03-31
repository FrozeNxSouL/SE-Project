import React from 'react'
import Link from "next/link";
import {getProducts,getAuctionProduct} from '@/api/action/fetch';
import LatestProducts from '@/component/panel/latestProduct';
import AuctionProducts from '@/component/panel/auction';
import getCategory from './action/getCategory';
import CategoryList from '@/component/panel/category';
// import getAuctionProduct from '@/api/action/getAuctionProduct';

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const auctionProduct = await getAuctionProduct();
  const products = await getProducts();
  const category = await getCategory();

  return (
    <div className='mx-auto flex justify-center flex-col gap-5 bg-base-100 max-w-screen-xl px-32'>
      <CategoryList data={category} />
      <div className="divider text-2xl font-bold">End soon</div>
      <AuctionProducts data={auctionProduct}/>
      <div className="divider text-2xl font-bold">Latest Products</div>
      {products.length > 0 ? (
        <LatestProducts data={products} />
      ) : (
        <p>No products available.</p>
      )}
    </div >

  )
}