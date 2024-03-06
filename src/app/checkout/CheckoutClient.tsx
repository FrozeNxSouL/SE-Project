"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient = () =>{
    const {cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('')

    const router = useRouter();

    console.log("paymentIntent", paymentIntent);
    console.log("clientSecret", clientSecret);

    useEffect(()=>{
        
        if(cartProducts){
            setLoading(true)
            setError(false)

            fetch('/api/create-payment-intent',{
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                }),
            }).then((res) =>{
                
                setLoading(false)
                if(res.status === 401){
                    return router.push('/auth/login')
                }
                return res.json()
            }).then((data) =>{
                console.log(data)
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error)=>{
                setError(true)
                console.log("Error", error)
                toast.error('Something went wrong')
            })
        }
    }, [cartProducts, paymentIntent])
    return (
        <div>
            Checkout
        </div>
    );
}

export default CheckoutClient;