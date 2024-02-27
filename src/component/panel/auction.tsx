"use client";
import { format } from 'date-fns';

export default function AuctionProducts(props: any) {
  const auctionProduct = props.data;

  return (
    <div>
      <div className='flex flex-wrap justify-center'>
        {props.data.map((item: any, idx: number) => (
          <div className="card bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:scale-[1.01]" key={idx}>
            <div className='absolute w-full m-2'>
              <div className='flex flex-col gap-2'>
                <div className="badge badge-neutral badge-sm">{format(item.updatedAt, 'yyyy-MM-dd')}</div>
                <div className="badge badge-primary badge-lg">{format(item.updatedAt, 'HH:mm:ss')}</div>
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
