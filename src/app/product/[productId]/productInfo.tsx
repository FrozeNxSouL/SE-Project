"use client";

import Button from "@/component/Button";
import ProductCarousel from "./carousel";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useEffect, useReducer, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
// import { productObject } from "./page";
import { useSession } from "next-auth/react";
import { Product } from "@prisma/client";

// interface ProductDetailsProps {
//   productDetails: productObject;
// }

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  img: string[];
  tag : string[];
};

export default function ProductInfo({productDetails} : any) {
  const session = useSession()
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { cartTotalQty } = useCart();
  // const productDetails = props.data;
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    quantity: 1,
    id: productDetails.id,
    description: productDetails.description,
    img: productDetails.imageUrl,
    name: productDetails.name,
    price: productDetails.price,
    tag : productDetails.tag,
  });
  const router = useRouter()
  

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === productDetails.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  return (
    <div className="w-full bg-base-100 flex justify-center flex-row gap-5 px-20 py-10">
      <ProductCarousel data={productDetails} />
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <h1 className="text-xl mb-3 text-wrap break-words">
            {productDetails?.name}
          </h1>
          <div className="bg-base-200 p-3">
            <h2 className="text-2xl text-primary">฿{productDetails.price}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <h3 className="w-1/12 font-bold">Tag</h3>
            <div className="flex gap-2">
              {productDetails.tag.map((item: any, index: number) => (
                <Link className="badge badge-primary" href="/" key={index}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <h3 className="w-1/12 font-bold">Detail</h3>
            <div className="flex gap-2 w-11/12 min-h-40 text-wrap break-words">
              <p className="w-full">{productDetails.description}</p>
            </div>
          </div>
        </div>
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-enter gap-1">
                <MdCheckCircle className= "text-teal-400"size = {20}/>
                <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
                <Button label="View Cart" outline onClick={() =>{
                    router.push('/cart');
                }} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-3">
              <Button
                label="Add to cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
              <button className="btn btn-wide btn-primary">Buy Now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
