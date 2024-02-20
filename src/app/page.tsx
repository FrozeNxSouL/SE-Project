import React from 'react'
import Link from "next/link";

function HomePage() {
  const categories = [
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
    {
      id: "/shop",
      label: "Shop",
      icon: "shopping_bag",
    },
  ]




  return (
    <div className='flex justify-center flex-col w-full bg-black px-32'>
      <h1 className='flex my-7 text-5xl'>HomePage</h1>

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          {/* <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" /> */}
          <div className='flex flex-row justify-evenly my-6 w-full'>
            <img className='flex size-32' src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/428615837_944079027072799_675545480892552765_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGSH6AltvlTali6lGpxPxQVJwJZdwJOM2InAll3Ak4zYh4Fas1ROKJT_nfUolU1CvEH5as5njdHa9UeM1m-scfT&_nc_ohc=Rv0tpJYVLusAX-qt2p1&_nc_ht=scontent.fbkk6-1.fna&oh=00_AfCrIdsUiXe5PtEaTv6fPH30GykqCSCMfBGa-00tBdp9jg&oe=65D6CB63" />
            <div className='flex flex-col'>
              <p className='flex text-2xl'>ไอเหี้ยนี่แม่งเกย์</p>
              <p>tag : cunny segs unknown</p>
              <p>time : 11:10:00:11</p>
              <p>due time : 15.00</p>
              <p className='flex text-3xl'>1000 Baht</p>
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    {/* <span style={{ "--value": 15 }}></span> */}
                  </span>
                  days
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    {/* <span style={{ "--value": 10 }}></span> */}
                  </span>
                  hours
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    {/* <span style={{ "--value": 24 }}></span> */}
                  </span>
                  min
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    {/* <span style={{ "--value": 32 }}></span> */}
                  </span>
                  sec
                </div>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className='flex flex-row justify-evenly my-6 w-full'>
            <img className='flex size-32' src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/428615837_944079027072799_675545480892552765_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGSH6AltvlTali6lGpxPxQVJwJZdwJOM2InAll3Ak4zYh4Fas1ROKJT_nfUolU1CvEH5as5njdHa9UeM1m-scfT&_nc_ohc=Rv0tpJYVLusAX-qt2p1&_nc_ht=scontent.fbkk6-1.fna&oh=00_AfCrIdsUiXe5PtEaTv6fPH30GykqCSCMfBGa-00tBdp9jg&oe=65D6CB63" />
            <div className='flex flex-col'>
              <p className='flex text-2xl'>ไอเหี้ยนี่แม่งเกย์</p>
              <p>tag : cunny segs unknown</p>
              <p>time : 11:10:00:11</p>
              <p>due time : 15.00</p>
              <p className='flex text-3xl'>1000 Baht</p>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
      </div>

      <div className='flex w-full bg-slate-500 h-max p-8 '>
        <div className='flex flex-col w-full'>
          <h3 className='text-3xl'>Auction</h3>

          {/* <div className='flex flex-row justify-evenly my-6 w-2/5'>
            <img className='flex size-32' src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/428615837_944079027072799_675545480892552765_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGSH6AltvlTali6lGpxPxQVJwJZdwJOM2InAll3Ak4zYh4Fas1ROKJT_nfUolU1CvEH5as5njdHa9UeM1m-scfT&_nc_ohc=Rv0tpJYVLusAX-qt2p1&_nc_ht=scontent.fbkk6-1.fna&oh=00_AfCrIdsUiXe5PtEaTv6fPH30GykqCSCMfBGa-00tBdp9jg&oe=65D6CB63" />
            <div className='flex flex-col'>
              <p className='flex text-2xl'>ไอเหี้ยนี่แม่งเกย์</p>
              <p>tag : cunny segs unknown</p>
              <p>time : 11:10:00:11</p>
              <p>due time : 15.00</p>
              <p className='flex text-3xl'>1000 Baht</p>
            </div>
          </div> */}

          <div className='flex flex-row justify-evenly my-6 w-2/5'>
            <img className='flex size-32' src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/428615837_944079027072799_675545480892552765_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGSH6AltvlTali6lGpxPxQVJwJZdwJOM2InAll3Ak4zYh4Fas1ROKJT_nfUolU1CvEH5as5njdHa9UeM1m-scfT&_nc_ohc=Rv0tpJYVLusAX-qt2p1&_nc_ht=scontent.fbkk6-1.fna&oh=00_AfCrIdsUiXe5PtEaTv6fPH30GykqCSCMfBGa-00tBdp9jg&oe=65D6CB63" />
            <div className='flex flex-col'>
              <p className='flex text-2xl'>ไอเหี้ยนี่แม่งเกย์</p>
              <p>tag : cunny segs unknown</p>
              <p>time : 11:10:00:11</p>
              <p>due time : 15.00</p>
              <p className='flex text-3xl'>1000 Baht</p>

              {/* <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
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
              </div> */}

            </div>
          </div>
        </div>
      </div>

      <h3 className='flex text-2xl'>Category</h3>
      <div className='flex flew-row justify-evenly w-full bg-slate-300 h-max p-8'>
        <div className='flex bg-slate-500 h-30 w-30 p-8'>
          <p>cunny</p>
        </div>

        <div className='flex bg-slate-500 h-30 w-30 p-8'>
          <p>cunny</p>
        </div>

      </div>

      <div>
        <p>product group</p>
        <h3 className='flex text-2xl'>type</h3>
        <div className='flex flex-wrap justify-between'>
          <div className="card w-96 bg-base-100 shadow-xl basis-72">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body bg-slate-800">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl basis-72">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body bg-slate-800">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl basis-72">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body bg-slate-800">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl basis-72">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body bg-slate-800">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  )
}

export default HomePage