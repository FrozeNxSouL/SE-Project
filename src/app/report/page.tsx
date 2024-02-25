import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function report() {





    return (

        <div className='flex bg-base-100 p-6 justify-center'>

            <div className='w-1/2 border-[2px] flex bg-base-100 p-6 flex-col'>


                <div className='flex'>

                    <h1>รายงาน</h1>

                    
                    <h1 className='font-extrabold ml-4'>ไอปูน</h1>
                    


                    <div className="max-h-12 avatar ml-5">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>

                    {/* <div className="ml-7 collapse bg-base-200">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            Click me to show/hide content
                        </div>
                        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>hello</p>
                        </div>
                    </div> */}

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

                    <input type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs mt-4" />

                    <textarea className="textarea textarea-warning mt-4" placeholder="Bio"></textarea>

                    <button className="btn btn-wide btn-primary mt-4 ">submit</button>

                </form>



            </div>

        </div>
    )



}