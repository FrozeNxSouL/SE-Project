"use client";

export default function AuctionProducts(props: any) {
  const auctionProduct = props.data;

  return (
    <div>
      <div className='flex flex-wrap justify-center'>
          {props.data.map((item: any, idx: number) => (
              <div className="card bg-base-100 shadow-xl basis-72 m-2 transition cursor-pointer hover:scale-[1.01]" key={idx}>
              <div className="badge badge-neutral absolute m-2">12:00:00 {item.currentBid}</div>
              <figure>
                  <img className="object-cover w-full h-40" src={item.imageUrl[0]} alt={item.name} />
              </figure>
              <div className="card-body p-5 bg-base-100">
                  <div className="flex flex-wrap gap-2">
                  <div className="badge badge-secondary">NEW</div>
                  <div className="badge badge-outline">{item.tag}</div>
                  </div>
                  <div className="card-title overflow-hidden whitespace-nowrap max-w-60">{item.name}</div>
                  <div className="card-actions justify-end">
                  <div>
                      <p className="text-secondary text-xl">฿ {item.price}</p>
                  </div>
                  </div>
              </div>
              </div>
          ))}

      </div>
      {/* {auctionProduct.map((value: any, idx: number) => (
        <div className="card lg:card-side bg-base-100 shadow-xl my-3" key={idx}>
          <figure>
            <img src={value.imageUrl[0]} className="h-72 w-72" alt={value.name} />
          </figure>
          <div className="card-body flex flex-row justify-between items-center">
            <div className="basis-1/3">
              <h2 className="card-title text-5xl font-bold my-9">{value.name}</h2>
              <p>{value.description}</p>
              <p>expire time: 15.00</p>
              <div className="badge badge-outline my-5">cunnyman</div>
            </div>
            <div className="flex flex-col items-center basis-1/3">
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max my-8">
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 15 }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 10 }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 24 }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": 32 }}></span>
                  </span>
                  sec
                </div>
              </div>
              <h3 className="tracking-widest text-lg">NOW</h3>
              <h3 className="text-3xl tracking-widest">{value.price} ฿</h3>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}
