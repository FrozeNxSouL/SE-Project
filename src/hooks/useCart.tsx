"use client"
import { getProductById } from "@/app/admin/fetch";
import payment from "@/app/payment/page";
import { CartProductType } from "@/app/product/[productId]/productInfo";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleClearCart: () => void;
    cartItems: any;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(1)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
    const [cartItems, setCartItems] = useState<any[]>([]);
    const session = useSession();

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
        const paymentIntent: string = JSON.parse(eShopPaymentIntent) 
        setCartProducts(cProducts)
        setPaymentIntent(paymentIntent);

        setCartItems(cProducts ?? []);
    }, [])

    useEffect(() => {
        const getTotals = () => {

            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price

                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                }, {
                    total: 0,
                    qty: 0
                })
                setCartTotalAmount(total)
                setCartTotalQty(qty)
            }

        };

        getTotals();
    }, [cartProducts])

    const handleAddProductToCart = useCallback(async (product: CartProductType) => {
        try {
            const fetchedProduct = await getProductById(product.id);

            if (fetchedProduct && session.data?.user.id !== fetchedProduct) {
                setCartProducts((prev) => {
                    const updatedCart = prev ? [...prev, product] : [product];

                    toast.success('Product added to cart');
                    localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
                    return updatedCart;
                });
            } else {
                toast.error('You cannot add your own product to the cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    }, [session.data?.user.id]);
    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter
                ((item) => {
                    return item.id != product.id
                })

            setCartProducts(filteredProducts)
            toast.success('Product removed');
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        toast.success('Product removed');
        localStorage.setItem('eShopCartItems', JSON.stringify(null))
    }, [cartProducts])

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(val));
    }, [paymentIntent]);

    // const handleSetTransactionID = useCallback((val: string | null) => {
    //     settrans(val)
    // }, [transactionID]);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart,
        paymentIntent,
        cartItems,
        handleSetPaymentIntent,
        // handleSetTransactionID,
        // transactionID,
    };

    // console.log(value);

    // console.log(value,"value");
    return <CartContext.Provider value={value} {...props} />
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context
};
