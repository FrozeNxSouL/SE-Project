"use client"

import { useState } from "react"

export default function SellerClient() {
    const [option, setOption] = useState("1");
    const [manage, setManage] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
        console.log(event.target.value)
    };

    const handleManage = () => {

    }

    return (
        <div className="flex flex-col items-center bg-base-100 max-w-screen-xl mx-auto min-h-screen gap-2">
            <div className="join p-12">
                <input className="join-item btn w-32" type="radio" name="options" value={"1"} onChange={handleChange} aria-label="Order" />
                <input className="join-item btn w-32" type="radio" name="options" value={"2"} onChange={handleChange} aria-label="Managed" />
                <input className="join-item btn w-32" type="radio" name="options" value={"3"} onChange={handleChange} aria-label="Completed" />
            </div>
            {(option == "1") && (

                <div className="card card-side bg-slate-700 shadow-xl w-4/5 h-44">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="flex flex-row w-full">
                        <div className="card-body w-2/5">
                            <h2 className="card-title">Product Name</h2>
                            <p>To User123</p>
                        </div>
                        <div className="card-body w-2/5">
                            <h2 className="card-title text-md">Address</h2>
                            <p className="text-sm">255/45  cunny street</p>
                            <p className="text-sm">bangbon, bangbon, bangkok 1323</p>
                            <p className="text-sm">Thailand</p>
                        </div>
                        <div className="flex justify-center items-center w-1/5">
                            <button className="btn btn-primary w-2/3" onClick={handleManage}>Manage</button>
                        </div>
                    </div>
                </div>

            )}
            {(option == "2") && (

                <div className="card card-side bg-slate-700 shadow-xl w-4/5 h-44">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="flex flex-row w-full">
                        <div className="card-body w-2/5">
                            <h2 className="card-title">Product Name</h2>
                            <p>To User123</p>
                        </div>
                        <div className="card-body w-2/5">
                            <h2 className="card-title text-md">Address</h2>
                            <p className="text-sm">255/45  cunny street</p>
                            <p className="text-sm">bangbon, bangbon, bangkok 1323</p>
                            <p className="text-sm">Thailand</p>
                        </div>
                        <div className="card-body w-1/5 justify-center items-center">
                            <h2 className="card-title italic">Pending. . .</h2>
                        </div>
                    </div>
                </div>
            )}

            {(option == "3") && (

                <div className="card card-side bg-slate-700 shadow-xl w-4/5 h-44">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="flex flex-row w-full">
                        <div className="card-body w-2/5">
                            <h2 className="card-title">Product Name</h2>
                            <p>To User123</p>
                        </div>
                        <div className="card-body w-2/5">
                            <h2 className="card-title text-md">Address</h2>
                            <p className="text-sm">255/45  cunny street</p>
                            <p className="text-sm">bangbon, bangbon, bangkok 1323</p>
                            <p className="text-sm">Thailand</p>
                        </div>
                        <div className="flex justify-center items-center w-1/5">
                            <button className="text-xl font-mono font-bold" >Completed</button>
                        </div>
                    </div>
                </div>

            )}



        </div>
    )
}

