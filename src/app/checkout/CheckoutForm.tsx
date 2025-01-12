"use client";
import Button from "@/component/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  PaymentElement,
  useElements,
  useStripe,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getManage, getProductById, updateWalletForCartItems } from "../admin/fetch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}


const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent, cartItems } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [tax, setTax] = useState<number | null>(null);
  const session = useSession();
  const formattedPrice =
    tax != null ? formatPrice(cartTotalAmount * (tax/100) + cartTotalAmount) : null;

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const managementData = await getManage();
        if (managementData?.tax != null) {
          setTax(managementData.tax);
        } else {
          console.error("Management data or tax value is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching tax:", error);
      }
    };
    // router.refresh()
    fetchTax();
  }, []);


  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then(async (result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          handleClearCart();
          handleSetPaymentSuccess(true);
          const money = (formattedPrice?.replace(/[^\d.]/g, ''));
          await updateWalletForCartItems(cartItems);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">
          Enter your details to complete checkout
        </h1>
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          defaultValues: {
            name: session.data?.user.name,
            address: {
              line1: session.data?.user.address[0],
              line2: session.data?.user.address[1],
              city: session.data?.user.address[2],
              state: session.data?.user.address[3],
              postal_code: session.data?.user.address[4],
              country: 'TH',
            },
          },
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => { }}
      />
    </form>
  );
};
export default CheckoutForm;
