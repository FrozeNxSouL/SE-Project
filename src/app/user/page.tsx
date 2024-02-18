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
                <h1 className='text-3xl text-orange-600 mt-5' >
                    paradorn
                </h1>

                <div className='w-72 h-72 border-[2px] mt-5 rounded-2xl text-center'>
                    <h1 className='text-2xl text-orange-600 mt-5 text-center' >
                        คะแนน : 0 
                    </h1>
                    <h1 className='text-2xl text-orange-600 mt-5 text-center'  >
                        กระเป๋าเงิน 
                    </h1>
                    <button className="w-32 mt-4 btn btn-outline btn-primary mx-auto">$100</button>

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
                <div className='bg-slate-400 h-full' >

                    <h1 >product</h1>
                </div>

            </div>

        </div>
    );
}

