import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function report() {





    return (

        <div className='flex bg-base-100 p-6 justify-center'>

            <div className='w-1/2 border-[2px] flex bg-base-100 p-6 flex-col'>


                <div className='flex'>

                    <h1>รายงาน</h1>


                    <h1 className='overflow-visible h-6 font-extrabold ml-4 '>paradornnnnnnnnnnnnnnnnnnnnnnnnnnnnn</h1>



                    <div className="h-11 avatar ml-5">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>

                    <div className="ml-7 collapse bg-base-200">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-primary ">
                            รายละเอียดสินค้า
                        </div>
                        <div className="collapse-content bg-primary ">
                            {/* <p>ชื่อสินค้า : รองเท้า</p>
                            <p>สถานะสินค้า : รอจัดส่ง</p>
                            <p>เลขพัสดุ : 10111010110</p> */}
                            <figure>
                                <img className="object-cover w-full h-40" src="https://media.discordapp.net/attachments/1130011642361561209/1185824208140390441/IMG_2470.jpg?ex=65e4125a&is=65d19d5a&hm=7d6d5d4bcceeae4c4223cd0a430a95d0ec2e3d1bbcf2a2f028a927adc1661826&=&format=webp" />
                            </figure>
                            <div className="card-body p-5 bg-base-100">
                                <div className="flex flex-wrap gap-2">
                                    <div className="badge badge-primary">NEW</div>
                                    <div className="badge badge-outline">wow</div>
                                </div>
                                <div className="card-title truncate overflow-hidden max-w-60">asdasd</div>
                                <div className="card-actions justify-end">
                                    <div>
                                        <p className="text-primary text-xl">฿199</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <form className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">ขายสินค้าไม่ตรงปก</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">จัดส่งสินค้านาน</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">ใช้คำพูดไม่เหมาะสม</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">ควยย</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>



                    <h1 className='font-extrabold mt-6'>เลือกรูปภาพ</h1>
                    <input type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs mt-2" />

                    <textarea className="h-40 textarea textarea-warning mt-4" placeholder="Bio"></textarea>

                    <button className="btn btn-wide btn-primary mt-4 ">submit</button>

                </form>



            </div>

        </div>
    )



}