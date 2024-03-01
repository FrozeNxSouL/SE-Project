'use client'
import { CartProductType } from "@/app/product/[productId]/productInfo";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from 'react-hot-toast'

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) =>{
    const [cartTotalQty, setCartTotalQty] = useState(1);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        console.log("1")
        setCartProducts((prev)=>{
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }

            toast.success('Product added to cart');
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, []);

    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) =>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter
            ((item) => {
                return item.id != product.id
            })

            setCartProducts(filteredProducts)
            toast.success('Product removed');
            localStorage.setItem('eShopCartItems',JSON.stringify(filteredProducts))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(()=>{
        setCartProducts(null)
        toast.success('Product removed');
        localStorage.setItem('eShopCartItems',JSON.stringify(null))
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart
    };

    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () =>{
    const context = useContext(CartContext);

    if(context === null){
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context
};
