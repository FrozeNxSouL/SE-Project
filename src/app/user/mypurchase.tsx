"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyPurchase() {
    const { data: session } = useSession()

    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
        <div className="divider text-2xl font-bold">My purchase</div>
        
        <div className="w-full h-48">
            <div className="w-full space-y-5">
                
                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-lg flex flex-row gap-2">
                        <div className="w-32">
                            <img className="object-cover size-28 ring-2 ring-primary rounded" src="https://media.discordapp.net/attachments/1016609763775234090/1215686557458104370/poonippoon.jpg?ex=65fda755&is=65eb3255&hm=ed4377a5c6fb2c53af6f8cfe2fd6e5649d1ab56127671f8d0cd4d2dfe6d6188c" />
                        </div>
                        <div className="w-full">
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dictum est. Aliquam dolor libero, bibendum ut mauris id</span>
                        </div>
                    </div>
                    <div className="collapse-content flex flex-col items-center gap-5"> 
                        <ul className="steps">
                            <li className="step step-primary">Order Paid</li>
                            <li className="step step-primary">Order Shipped Out</li>
                            <li className="step">To Recevied</li>
                            <li className="step">To Rate</li>
                        </ul>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-lg flex flex-row gap-2">
                        <div className="w-32">
                            <img className="object-cover size-28 ring-2 ring-primary rounded" src="https://media.discordapp.net/attachments/1016609763775234090/1215686557458104370/poonippoon.jpg?ex=65fda755&is=65eb3255&hm=ed4377a5c6fb2c53af6f8cfe2fd6e5649d1ab56127671f8d0cd4d2dfe6d6188c" />
                        </div>
                        <div className="w-full">
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dictum est. Aliquam dolor libero, bibendum ut mauris id</span>
                        </div>
                    </div>
                    <div className="collapse-content flex flex-col items-center gap-5"> 
                        <ul className="steps">
                            <li className="step step-primary">Order Paid</li>
                            <li className="step step-primary">Order Shipped Out</li>
                            <li className="step">To Recevied</li>
                            <li className="step">To Rate</li>
                        </ul>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-lg flex flex-row gap-2">
                        <div className="w-32">
                            <img className="object-cover size-28 ring-2 ring-primary rounded" src="https://media.discordapp.net/attachments/1016609763775234090/1215686557458104370/poonippoon.jpg?ex=65fda755&is=65eb3255&hm=ed4377a5c6fb2c53af6f8cfe2fd6e5649d1ab56127671f8d0cd4d2dfe6d6188c" />
                        </div>
                        <div className="w-full">
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dictum est. Aliquam dolor libero, bibendum ut mauris id</span>
                        </div>
                    </div>
                    <div className="collapse-content flex flex-col items-center gap-5"> 
                        <ul className="steps">
                            <li className="step step-primary">Order Paid</li>
                            <li className="step step-primary">Order Shipped Out</li>
                            <li className="step">To Recevied</li>
                            <li className="step">To Rate</li>
                        </ul>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-lg flex flex-row gap-2">
                        <div className="w-32">
                            <img className="object-cover size-28 ring-2 ring-primary rounded" src="https://media.discordapp.net/attachments/1016609763775234090/1215686557458104370/poonippoon.jpg?ex=65fda755&is=65eb3255&hm=ed4377a5c6fb2c53af6f8cfe2fd6e5649d1ab56127671f8d0cd4d2dfe6d6188c" />
                        </div>
                        <div className="w-full">
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dictum est. Aliquam dolor libero, bibendum ut mauris id</span>
                        </div>
                    </div>
                    <div className="collapse-content flex flex-col items-center gap-5"> 
                        <ul className="steps">
                            <li className="step step-primary">Order Paid</li>
                            <li className="step step-primary">Order Shipped Out</li>
                            <li className="step">To Recevied</li>
                            <li className="step">To Rate</li>
                        </ul>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}