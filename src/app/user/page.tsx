import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function user() {

    return (


        <div className='flex bg-base-100 p-6'>


            <div className='flex flex-col items-center w-1/4'>


                <div className="avatar ">
                    <div className='w-[15rem] rounded-full'>
                        <img src='https://media.discordapp.net/attachments/1130011642361561209/1185824208140390441/IMG_2470.jpg?ex=65e4125a&is=65d19d5a&hm=7d6d5d4bcceeae4c4223cd0a430a95d0ec2e3d1bbcf2a2f028a927adc1661826&=&format=webp&width=507&height=676'>
                        </img>
                    </div>

                </div>
                <h1 className='text-3xl text-orange-600 mt-5 font-mono' >
                    paradorn
                </h1>

                <div className='w-72 h-72 border-[2px] mt-5 rounded-2xl text-center'>
                    <h1 className='text-2xl text-orange-600 mt-5 text-center font-mono' >
                        คะแนน : 0
                    </h1>

                    <div className="rating rating-md">
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
                    </div>

                    <div className="stats bg-primary text-primary-content mt-3">
                        <div className="stat">
                            <div className="stat-title  ">Current balance</div>
                            <div className="stat-value">89,400 บาท</div>
                            <div className="stat-actions">
                                <button className="btn btn-sm">Withdrawal</button>
                                <button className="btn btn-sm ml-3">deposit</button>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div className='flex flex-col w-3/4'>
                {/* <button className="btn btn-primary ">สถานะสินค้า</button>
                    <button className="btn btn-primary ml-10">สถานะสินค้า</button> */}
                <div role="tablist" className="tabs tabs-bordered ">
                    <a role="tab" className="tab">สถานะสินค้า</a>
                    <a role="tab" className="tab tab-active">สินค้าที่มี</a>
                    <a role="tab" className="tab">ประวัติการซื้อ-ขาย</a>
                </div>
                <div className='bg-gradient-to-r from-purple-500 to-pink-500 h-full p-10 grid grid-cols-5 mx-auto gap-9' >

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl ">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl ">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl ">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl ">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-compact w-60 h-80 bg-base-100 shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>



                </div>

            </div>

        </div>
    );
}

