"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchCashInWallet, updateCashInWallet } from "../admin/fetch";
import { useRouter } from "next/navigation";

export default function Page() {
  const [cashInWallet, setCashInWallet] = useState<number | null>(null);
  const { data: session } = useSession();
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const currentUser = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    const getCashInWallet = async () => {
      if (currentUser) {
        try {
          const cash = await fetchCashInWallet(currentUser);
          setCashInWallet(cash);
        } catch (error) {
          console.error("Error fetching cash in wallet:", error);
        }
      }
    };

    getCashInWallet();
  }, [currentUser,cashInWallet]);

  const handleTopUp = async () => {
    try {
        await updateCashInWallet(currentUser!,topUpAmount);
        setTopUpAmount(0); // Reset the top-up amount to 0
        setCashInWallet(cashInWallet!+topUpAmount)
    } catch (error) {
      console.error("Error adding cash to wallet:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <div className="avatar">
          <div className="w-24 rounded-full flex-auto">
            <img src={session?.user.picture } />
          </div>
        </div>
        <label className="input input-bordered flex items-center gap-2 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <h1>เงินปัจจุบัน : {cashInWallet} บาท</h1>
        </label>
        <label className="input input-bordered flex items-center gap-2 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input 
            type="number" // Change input type to "number"
            className="grow" 
            placeholder="Top-up amount" 
            value={topUpAmount} // Bind value to the state
            onChange={(e) => setTopUpAmount(parseInt(e.target.value))} // Update top-up amount state on change
          />
          
        </label>
        <button className="btn btn-outline btn-warning" onClick={handleTopUp}>TOP UP</button>
      </div>
    </div>
  );
}
