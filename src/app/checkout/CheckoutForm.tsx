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
import { getAddressByUserId, getManage } from "../admin/fetch";
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
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [tax, setTax] = useState<number | null>(null);
//   const router = useRouter();

  // const [defaultAddress, setDefaultAddress] = useState({
  //   name: "RRR",
  //   address: {
  //     line1: "RRR",
  //     line2: "RRR",
  //     city: "RRR",
  //     state: "RRR",
  //     postal_code: "12312",
  //     country: "TH",
  //   },
  // });
  const formattedPrice =
    tax != null ? formatPrice(cartTotalAmount * tax + cartTotalAmount) : null;

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

  // const session = useSession();
  // const userId = session?.data?.user.id ?? "";
//   console.log(userId);
  // useEffect(() => {
  //   const fetchAddress = async () => {
  //     try {
  //       // Fetch addresses from the backend based on the user ID
  //       const addresses = await getAddressByUserId(userId); // Replace this with your actual API call
  //       console.log(addresses);
  //       // Use the first address as the default value

  //       const firstAddress = addresses;
  //       setDefaultAddress({
  //         name: session?.data?.user?.name ?? "", // Provide a default value if session?.data?.user?.name is undefined
  //         address: {
  //           line1: firstAddress.address?.line1 ?? "",
  //           line2: firstAddress.address?.line2 ?? "",
  //           city: firstAddress.address?.city ?? "",
  //           state: firstAddress.address?.state ?? "",
  //           postal_code: firstAddress.address?.postal_code ?? "",
  //           country: firstAddress.address?.country ?? "",
  //         },
  //       });
  //       console.log(defaultAddress)
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  //   fetchAddress();
  // }, [userId]);

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
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          handleClearCart();
          handleSetPaymentSuccess(true);
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
            name: 'Jane Doe',
            address: {
              line1: '354 Oyster Point Blvd',
              line2: '',
              city: 'South San Francisco',
              state: 'CA',
              postal_code: '94080',
              country: 'US',
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
        onClick={() => {}}
      />
    </form>
  );
};
export default CheckoutForm;
