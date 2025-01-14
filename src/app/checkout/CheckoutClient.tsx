"use client";
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "@/component/Button";
import { scanForTrans, updateProductsInTransaction } from "../admin/fetch";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transac, setTransac] = useState<string | null>(null);
  const [isPageReady, setIsPageReady] = useState(false); // State to control page readiness
  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();


  useEffect(() => {
    if(typeof window !== "undefined") {
      if (cartProducts) {
        setLoading(true);
        setError(false);
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartProducts,
            payment_intent_id: paymentIntent,
          }),
        })
          .then((res) => {
            setLoading(false);
            if (res.status === 401) {
              return router.push("/auth/login");
            }
            return res.json();
          })
          .then((data) => {
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          })
          .catch((error) => {
            setError(true);
            console.log("Error", error);
            toast.error("Something went wrong");
          });
      }
    }
  }, [cartProducts, paymentIntent])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const paymentHandler = (value: boolean) => {
    setPaymentSuccess(value);
  };

  useEffect(() => {
    if(typeof window !== "undefined") {
      const fetchTransactionId = async () => {
        if (cartProducts && cartProducts.length > 0) {
          const transactionId = await scanForTrans(cartProducts[0].id!);
          setTransac(transactionId);
        }
      };
  
      fetchTransactionId();
    }
  }, [cartProducts, paymentSuccess])

  useEffect(() => {
    if(typeof window !== "undefined") {
      const updateTransaction = async () => {
        if (paymentSuccess && transac) {
          await updateProductsInTransaction(transac);
        }
      };
  
      if (clientSecret && transac) {
        updateTransaction();
      }
    }
  }, [paymentSuccess, transac, clientSecret])



  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={paymentHandler} />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && <div className="text-center text-rose-500">Something went wrong...</div>}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button label="View Your Orders" onClick={() => router.push('/orders')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
