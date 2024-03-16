"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createReport } from './reportfetch';
interface ReportFormProps {
    userId: string;
}
export default function ReportForm({ userId }: ReportFormProps) {
    const [description,setdescription] = useState<string>("first")
    return (

        <div className='flex bg-base-100 p-6 justify-center max-w-screen-lg mx-auto'>

            <div className='w-full shadow-lg flex flex-col bg-base-100 p-6'>
                <h1>รายงาน</h1>
                <div className="flex flex-row flex-wrap justify-between gap-4">
                    <div className="flex justify-start m-5">
                        <div className="h-11 avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <h1 className='overflow-visible h-6 font-extrabold ml-4 '>wow</h1>
                    </div>
                    <div className='min-w-96 flex'>
                        <div className="collapse bg-base-200">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title bg-primary ">
                                รายละเอียดสินค้า
                            </div>
                            <div className="collapse-content bg-primary ">
                                <figure>
                                    <img className="object-cover w-full h-40" src="https://media.discordapp.net/attachments/1130011642361561209/1185824208140390441/IMG_2470.jpg?ex=65e4125a&is=65d19d5a&hm=7d6d5d4bcceeae4c4223cd0a430a95d0ec2e3d1bbcf2a2f028a927adc1661826&=&format=webp" />
                                </figure>
                                <div className="card-body p-5 bg-base-100">
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
                        <span className="label-text">ความไม่ชัดเจนในการให้ข้อมูลสินค้า</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">การแก้ไขปัญหาและการคืนสินค้า</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">การให้บริการหลังการขายที่ไม่มีประสิทธิภาพ</span>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>



                    <h1 className='font-extrabold mt-6'>เลือกรูปภาพ</h1>
                    <input type="file" className="file-input file-input-bordered w-full mt-2" />

                    <textarea className="h-40 textarea textarea-primary mt-4" placeholder="Bio"></textarea>

                    <button onClick={()=>{
                        createReport(description)
                    }}className="btn btn-block btn-primary mt-4 ">submit</button>

                </form>



            </div>

        </div>
    )



}