"use client";
import { format } from 'date-fns';
import { useState } from 'react';
import { secondsInAMinute, minutesInAnHour, hoursInADay, daysInAMonth, daysInAYear } from "@/component/variables"

interface Time {
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
}

export default function AuctionProducts(props: any) {
  const auctionProduct = props.data

  const arr: Time[] = []
  const dateArr: Date[] = []
  const minuteArr: number[] = []
  const hourArr: number[] = []
  const dayArr: number[] = []

  // const data: Time = { year : 0,   
  //   month: 0,
  //   day: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // };

  // arr.push(data);
  const [setTheTime, theTime] = useState(dateArr);
  auctionProduct.forEach((element: any) => {
    setTheTime.push(element)
  });
  const [setRemaining, remaining] = useState(arr);
  let finishTime: Date;

  const func = () => {
    const currentTime: Date = new Date();
    auctionProduct.forEach((element: any) => {
      finishTime = new Date(element.updatedAt);
      const getTime: number = finishTime.getTime() - currentTime.getTime();

      let remainingTimeInSeconds: number = Math.floor(getTime / 1000);
      const years: number = Math.floor(remainingTimeInSeconds / (daysInAYear * hoursInADay * minutesInAnHour * secondsInAMinute));
      remainingTimeInSeconds -= years * daysInAYear * hoursInADay * minutesInAnHour * secondsInAMinute;

      const months: number = Math.floor(remainingTimeInSeconds / (daysInAMonth * hoursInADay * minutesInAnHour * secondsInAMinute));
      remainingTimeInSeconds -= months * daysInAMonth * hoursInADay * minutesInAnHour * secondsInAMinute;

      const days: number = Math.floor(remainingTimeInSeconds / (hoursInADay * minutesInAnHour * secondsInAMinute));
      remainingTimeInSeconds -= days * hoursInADay * minutesInAnHour * secondsInAMinute;

      const hours: number = Math.floor(remainingTimeInSeconds / (minutesInAnHour * secondsInAMinute));
      remainingTimeInSeconds -= hours * minutesInAnHour * secondsInAMinute;

      const minutes: number = Math.floor(remainingTimeInSeconds / secondsInAMinute);
      remainingTimeInSeconds -= minutes * secondsInAMinute;

      const seconds: number = remainingTimeInSeconds;

      const data: Time = {
        year: years,
        month: months,
        day: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
      console.log(`Remaining time: ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
      setRemaining.push(data);
    });
    // setInterval(func,1000)

    const Ipoon =()=>{

    }
  }

  return (
    <div>
      <div className='flex flex-wrap justify-center'>
        {props.data.map((item: any, idx: number) => (
          <div className="card bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:scale-[1.01]" key={idx}>
            <div className='absolute w-full m-2'>
              <div className='flex flex-col gap-1'>
                <div className="badge badge-neutral badge-sm">{format(item.updatedAt, 'yyyy-MM-dd HH:mm:ss')}</div>
                {/* <div className="badge badge-primary badge-lg">{format(`${theTime[idx]}`, 'yyyy-MM-dd HH:mm:ss')}</div> */}
              </div>
            </div>
            <figure>
              <img className="object-cover w-full h-40" src={item.product.imageUrl[0]} alt={item.product.name} />
            </figure>
            <div className="card-body p-5 bg-base-100">
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-secondary">NEW</div>
                <div className="badge badge-outline">{item.product.tag[0]}</div>
              </div>
              <div className="card-title overflow-hidden whitespace-nowrap max-w-60">{item.product.name}</div>
              <div className="card-actions justify-end">
                <div>
                  <p className="text-secondary text-xl">฿ {item.product.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
