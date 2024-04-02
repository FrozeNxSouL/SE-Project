"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import React, { useEffect } from "react";
import { createReport, getproduct, getproductanduser } from "./reportfetch";
import { getCurrentSession } from "@/lib/getCurrentSession";
import { useSession } from "next-auth/react";
interface ReportFormProps {
  productId: string;
}

export default function ReportForm({ productId }: ReportFormProps) {
  const [description, setdescription] = useState<string>("first");
  const [checkbox, setCheckbox] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [data, setdata] = useState<(string | null)[]>([]);

  const [productImgUrl, setProductImgUrl] = useState<string[] | undefined>([
    "https://laz-img-sg.alicdn.com/p/6a78913c131cfcd539813bd4b7c42459.png",
  ]);
  const [productname, setProductname] = useState<string | undefined>("product");

  const [sellerImgUrl, setsellerImgUrl] = useState<string | undefined>("");
  const [productprice, setProductprice] = useState<number | any>(0);

  const [username, setusername] = useState<string | undefined>("kkkk");
  const [reportwho, setreportwho] = useState<string | undefined>("");

  const [imageField, setImageField] = useState("");
  const [reportImage, setreportImage] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const session = useSession();
  useEffect(() => {
    const fetchUsername = async () => {
      const result = await getproductanduser(productId);
      setusername(result?.User?.name);
      // const product = await getproduct("65f03a822e0ab3a001a62fe4");
      setProductImgUrl(result?.imageUrl);
      setProductname(result?.name);
      setProductprice(result?.price);
      setsellerImgUrl(result?.User?.picture);
      setreportwho(result?.User?.id);
    };
    fetchUsername();
  }, [productId]);

  const [des, setDes] = useState("");
  const ref = [
    "ขายสินค้าไม่ตรงปก",
    "จัดส่งสินค้านาน ",
    "ใช้คำพูดไม่เหมาะสม",
    "ความไม่ชัดเจนในการให้ข้อมูลสินค้า ",
    "การแก้ไขปัญหาและการคืนสินค้า",
    "การให้บริการหลังการขายที่ไม่มีประสิทธิภาพ",
  ];

  const handleCheckboxChange = (index: any) => {
    const newCheckboxes = [...checkbox];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckbox(newCheckboxes);

    const newData = newCheckboxes.map((isChecked, i) =>
      isChecked ? ref[i] : null
    ) as (string | null)[];
    console.log("Selected choice:", newData);
    setdata(newData);
  };
  const handleTextareaChange = (event: any) => {
    // Update the state with the new value from the textarea
    setDes(event.target.value);
  };
  const handleImageURL = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setImageField(e.target.value);
  }
  const handleAddImage = ()=> {
      if (reportImage.length == 5) {
          setError("Cannot upload more than 5 images");
      } else {
          const newImage: string[] = [...reportImage];
          newImage.push(imageField);
          setreportImage(newImage);
      }

  }
  const handleRemoveImage = (idx: number)=> {
      const arr: string[] = reportImage.filter((img, index) => index !== idx);
      setreportImage(arr)
  }

  return (
    <div className="flex bg-base-100 p-6 justify-center max-w-screen-lg mx-auto">
      <div className="w-full shadow-lg flex flex-col bg-base-100 p-6">
        {error && (
            <div role="alert" className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{error}</span>
                <div>
                    <button className="btn btn-error btn-sm" onClick={() => { setError(null) }}><span className="material-icons">close</span></button>
                </div>
            </div>
        )}
        <h1>รายงาน</h1>
        <div className="flex flex-row flex-wrap justify-between gap-4">
          <div className="flex justify-start m-5">
            <div className="h-11 avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={sellerImgUrl} />
              </div>
            </div>
            <h1 className="overflow-visible h-6 font-extrabold ml-4 ">
              {username}
            </h1>
          </div>
          <div className="min-w-96 flex">
            <div className="collapse bg-base-200">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-primary ">รายละเอียดสินค้า</div>
              <div className="collapse-content bg-primary ">
                <div>
                  {productImgUrl && productImgUrl.map((url, index) => (
                    <figure key={index}>
                      <img className="object-cover w-full h-40" src={url} />
                    </figure>
                  ))}
                </div>
                <div className="card-body p-5 bg-base-100">
                  <div className="card-title truncate overflow-hidden max-w-60">
                    {productname}
                  </div>
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
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(0)}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">จัดส่งสินค้านาน</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(1)}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">ใช้คำพูดไม่เหมาะสม</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(2)}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">
              ความไม่ชัดเจนในการให้ข้อมูลสินค้า
            </span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(3)}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">การแก้ไขปัญหาและการคืนสินค้า</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(4)}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">
              การให้บริการหลังการขายที่ไม่มีประสิทธิภาพ
            </span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => handleCheckboxChange(5)}
            />
          </label>
          <div className="flex flex-row gap-2 justify-center">
            {reportImage.map((image, index) => (
                <div className="size-32 rounded-lg" key={index}>
                    <button className="btn btn-error size-32 opacity-0 hover:opacity-70 absolute active:ring ring-opacity-100 ring-error" onClick={() => handleRemoveImage(index)}>
                        <span className="material-icons">delete</span>
                    </button>
                    <img className="object-cover size-full rounded-lg" src={image} />
                </div>
            ))}
          </div>

          <div className="join w-full">
              <label className="input input-bordered flex items-center gap-2 join-item w-full">
                  Image
                  <kbd className="kbd kbd-sm"><span className="material-icons">link</span></kbd>
                  <input required name="name" className="grow bg-transparent" onChange={handleImageURL} />
              </label>
              <div className="btn btn-primary join-item" onClick={handleAddImage}>Click to add</div>
          </div>
          <textarea
            className="h-40 textarea textarea-primary mt-4"
            placeholder="Additional information about report"
            value={des}
            onChange={handleTextareaChange} />

          {session.data?.user?.id && (
            <button
              onClick={() => {
                createReport(
                  des,
                  data,
                  session.data?.user?.id,
                  reportwho,
                  reportImage
                );
              }}
              className="btn btn-block btn-primary mt-4 "
            >
              submit
            </button>
          )}

          {/* <button type='button' onClick={handleButtonClick} className="btn btn-block btn-primary mt-4 ">test fetch</button> */}
        </form>
      </div>
    </div>
  );
}
