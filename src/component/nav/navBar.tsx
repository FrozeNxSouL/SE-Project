import Link from "next/link";


export default function NavBar() {
    // window.onscroll = function() {scrollFunction()};

    // const scrollFunction = () => {
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         document.getElementById("header").style.fontSize = "30px";
    //       } else {
    //         document.getElementById("header").style.fontSize = "90px";
    //       }
    // }
    return (
        <div className="navbar bg-base-100 sticky top-0 z-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/homepage">HomepLinkge</Link></li>
                        <li><Link href="/homePage">Portfolio</Link></li>
                        <li><Link href="/homePage">Portfolio</Link></li>
                        <li><Link href="/homePage">Linkbout</Link></li>
                    </ul>
                </div>
                <Link href="/" className=" btn btn-ghost text-xl">NiTid Second-Hand Industry</Link>
            </div>
            <div className="navbar-center">
                <Link href="/shop" className=" btn btn-ghost text-base">
                    <span className="material-icons">
                        shopping_bag
                    </span>Shop</Link>
                <Link href="/auction" className=" btn btn-ghost text-base">
                    <span className="material-icons">
                        timeline
                    </span>Auction</Link>
                <Link href="/sell" className=" btn btn-ghost text-base">
                    <span className="material-icons">
                        attach_money
                    </span>Sell</Link>
                <Link href="/auction" className=" btn btn-ghost text-base">
                    <span className="material-icons">
                        local_shipping
                    </span>Items Status</Link>
            </div>
            <div className="navbar-end">
                <input type="text" placeholder="Search" className="input input-bordered w-full min-w-xl" />
                <button className="btn btn-ghost btn-circle">                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <span className="material-icons">
                            shopping_cart
                        </span>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <span className="material-icons">
                        wallet
                    </span>
                </button>

                

                
                <button className="btn btn-ghost btn-circle">
                <Link href="/login" className=" btn btn-ghost text-base">
                <Link href="/login" className=" btn btn-ghost text-base">
                    <span className="material-icons">
                        account_circle
                    </span>
                </Link>
                </Link>
                </button>
            </div>
        </div>
    )
}
