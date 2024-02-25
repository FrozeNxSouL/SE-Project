export default function user() {

    return (


        <div className='flex bg-base-100 p-6 max-w-screen-xl mx-auto'>


            <div className='flex flex-col items-center'>


                <div className="avatar ">
                    <div className='w-40 rounded-full'>
                        <img src='https://media.discordapp.net/attachments/1130011642361561209/1185824208140390441/IMG_2470.jpg?ex=65e4125a&is=65d19d5a&hm=7d6d5d4bcceeae4c4223cd0a430a95d0ec2e3d1bbcf2a2f028a927adc1661826&=&format=webp&width=507&height=676'>
                        </img>
                    </div>

                </div>
                <h1 className='font-bold text-2xl mt-5'>paradorn</h1>

                <div className='w-72 h-72 mt-5 rounded-2xl text-center'>

                    <div className="rating rating-md">
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-primary" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-primary" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-primary" checked/>
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-primary" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-primary" />
                    </div>

                    <div className="stats text-primary-content mt-3">
                        <div className="stat">
                            <div className="stat-title">Current balance</div>
                            <div className="stat-value text-primary">89,400 บาท</div>
                            <div className="stat-actions">
                                <button className="btn btn-sm">Withdrawal</button>
                                <button className="btn btn-sm ml-3">deposit</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex flex-col w-3/4'>
                <div role="tablist" className="tabs tabs-bordered ">
                    <a role="tab" className="tab">สถานะสินค้า</a>
                    <a role="tab" className="tab tab-active">สินค้าที่มี</a>
                    <a role="tab" className="tab">ประวัติการซื้อ-ขาย</a>
                </div>
                <div className='flex flex-wrap p-3 mx-auto gap-2' >
                    <div className="card bg-base-100 shadow-xl basis-72 transition cursor-pointer hover:scale-[1.01] min-w-60">
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
                    <div className="card bg-base-100 shadow-xl basis-72 transition cursor-pointer hover:scale-[1.01] min-w-60">
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
                    <div className="card bg-base-100 shadow-xl basis-72 transition cursor-pointer hover:scale-[1.01] min-w-60">
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
                    <div className="card bg-base-100 shadow-xl basis-72 transition cursor-pointer hover:scale-[1.01] min-w-60">
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
                                        <div className="card bg-base-100 shadow-xl basis-72 transition cursor-pointer hover:scale-[1.01] min-w-60">
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

        </div>
    );
}

