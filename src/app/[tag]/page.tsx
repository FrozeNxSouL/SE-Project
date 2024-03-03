import React from 'react'
import Link from "next/link";
import {getProducts,getAuctionProduct, getProductbyTag, getAuctionProductbyTag} from '@/api/action/fetch';
import Category from '@/component/panel/category';
import LatestProducts from '@/component/panel/latestProduct';
import AuctionProducts from '@/component/panel/auction';
// import getAuctionProduct from '@/api/action/getAuctionProduct';


export default async function HomePageByTag({params}: {params: {tag:string}}) {
  
  const auctionProduct = await getAuctionProductbyTag(params.tag);
  const products = await getProductbyTag(params.tag);

  return (
    <div className='mx-auto flex justify-center flex-col gap-5 bg-base-100 max-w-screen-xl px-32'>
      <Category />
      <div className="divider text-2xl font-bold">Auction</div>
      <AuctionProducts data={auctionProduct}/>
      <div className="divider text-2xl font-bold">Products</div>
      {products.length > 0 ? (
        <LatestProducts data={products} />
      ) : (
        <p>No products available.</p>
      )}
    </div >

  )
}