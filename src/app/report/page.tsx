"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { createReport, getproduct, getproductname, getproductprice, getusername } from './reportfetch';
export default function report() {
    const [checkbox, setCheckbox] = useState([false, false, false, false, false, false]);
    const [data, setdata] = useState([]);
    const [productImgUrl, setProductImgUrl] = useState('https://laz-img-sg.alicdn.com/p/6a78913c131cfcd539813bd4b7c42459.png');
    const [productname, setProductname] = useState("product");

    const [productprice, setProductprice] = useState<number|any>(0);

    const [username, setusername] = useState("kkkk");

    // const test = await getproductprice("65f03a822e0ab3a001a62fe4");

    const handleButtonClick = async () => {
        try {
            const product = await getproduct("65f03a822e0ab3a001a62fe4");
            console.log(product)
            setProductImgUrl(product.imageUrl);
            setProductname(product.name);
            setProductprice(product?.price);

            const username = await getusername("65f03a822e0ab3a001a62fe4");
            setusername(username);
            
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const [des, setDes] = useState("");
    const ref = ["ขายสินค้าไม่ตรงปก", "จัดส่งสินค้านาน ", "ใช้คำพูดไม่เหมาะสม", "ความไม่ชัดเจนในการให้ข้อมูลสินค้า ", "การแก้ไขปัญหาและการคืนสินค้า", "การให้บริการหลังการขายที่ไม่มีประสิทธิภาพ"]

    const handleCheckboxChange = (index: any) => {
        const newCheckboxes = [...checkbox];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckbox(newCheckboxes);

        const newData = newCheckboxes.map((isChecked, i) => isChecked ? ref[i] : null) as (string | null)[];
        console.log('Selected choice:', newData);
        setdata(newData);

    };
    const handleTextareaChange = (event: any) => {
        // Update the state with the new value from the textarea
        setDes(event.target.value);
    };

    //       const [selectedFile, setSelectedFile] = useState();

    //   const handleFileChange = (event) => {
    //     const file = event.target.files[0];

    //     // Do something with the selected file (e.g., store it in state)
    //     setSelectedFile(file);

    //     // You can also perform additional actions with the file, such as uploading it to a server
    //   };



    return (
        <div className='flex bg-base-100 p-6 justify-center max-w-screen-lg mx-auto'>

            <div className='w-full shadow-lg flex flex-col bg-base-100 p-6'>
                <h1>รายงาน</h1>
                <div className="flex flex-row flex-wrap justify-between gap-4">
                    <div className="flex justify-start m-5">
                        <div className="h-11 avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={productImgUrl} />
                            </div>
                        </div>
                        <h1 className='overflow-visible h-6 font-extrabold ml-4 '>{username}</h1>
                    </div>
                    <div className='min-w-96 flex'>
                        <div className="collapse bg-base-200">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title bg-primary ">
                                รายละเอียดสินค้า
                            </div>
                            <div className="collapse-content bg-primary ">
                                <figure>
                                    <img className="object-cover w-full h-40" src={productImgUrl} />
                                </figure>
                                <div className="card-body p-5 bg-base-100">
                                    <div className="card-title truncate overflow-hidden max-w-60">{productname}</div>
                                    <div className="card-actions justify-end">
                                        <div>
                                            <p className="text-primary text-xl">฿{productprice}</p>
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
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(0)} />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">จัดส่งสินค้านาน</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(1)} />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">ใช้คำพูดไม่เหมาะสม</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(2)} />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">ความไม่ชัดเจนในการให้ข้อมูลสินค้า</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(3)} />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">การแก้ไขปัญหาและการคืนสินค้า</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(4)} />
                    </label>

                    <label className="label cursor-pointer">
                        <span className="label-text">การให้บริการหลังการขายที่ไม่มีประสิทธิภาพ</span>
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={() => handleCheckboxChange(5)} />
                    </label>



                    <h1 className='font-extrabold mt-6'>เลือกรูปภาพ</h1>
                    <input type="file" className="file-input file-input-bordered w-full mt-2" />

                    <textarea className="h-40 textarea textarea-primary mt-4" placeholder="Bio" value={des} onChange={handleTextareaChange} ></textarea>

                    {/* <button className="btn btn-block btn-primary mt-4" onClick={handleSubmit} >submit</button> */}
                    <button onClick={() => {
                        createReport(des, data)
                    }} className="btn btn-block btn-primary mt-4 ">submit</button>

                    <button type='button' onClick={handleButtonClick} className="btn btn-block btn-primary mt-4 ">test fetch</button>

                </form>



            </div>

        </div>
    )



}
