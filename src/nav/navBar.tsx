// "use client"

// import Link from "next/link";
// import { useState } from "react";

// export default function NavBar() {
//     const handleClick = () => {
//         console.log('Button clicked!');
//     }

//     const [profile,setProfile] = useState(false);
//     // const afterClick = () => {
//     //     <div className="py-96">
//     //         cunny
//     //     </div>
//     // }
//     // window.onscroll = function() {scrollFunction()};

//     // const scrollFunction = () => {
//     //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     //         document.getElementById("header").style.fontSize = "30px";
//     //       } else {
//     //         document.getElementById("header").style.fontSize = "90px";
//     //       }
//     // }
//     return (
//         <>
//             <div className="navbar bg-base-100 fixed bg-stone-900 py-4">
//                 <div className="navbar-start">
//                     <Link href="/" className=" btn btn-ghost text-xl">SECOND HAND'S PRODUCTS</Link>
//                 </div>
//                 <div className="navbar-center">
//                     <Link href="/shop" className=" btn btn-ghost text-base">
//                         <span className="material-icons">
//                             shopping_bag
//                         </span>Shop</Link>
//                     {/* <Link href="/auction" className=" btn btn-ghost text-base">
//                     <span className="material-icons">
//                         timeline
//                     </span>Auction</Link>
//                 <Link href="/sell" className=" btn btn-ghost text-base">
//                     <span className="material-icons">
//                         attach_money
//                     </span>Sell</Link>
//                 <Link href="/auction" className=" btn btn-ghost text-base">
//                     <span className="material-icons">
//                         local_shipping
//                     </span>Items Status</Link> */}

//                 </div>
//                 <div className="navbar-end">
//                     <input type="text" placeholder="Search" className="input input-bordered w-full min-w-xl" />
//                     <button className="btn btn-ghost btn-circle">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                     </button>
//                     <button className="btn btn-ghost btn-circle">
//                         <div className="indicator">
//                             <span className="material-icons">
//                                 shopping_cart
//                             </span>
//                             <span className="badge badge-xs badge-primary indicator-item"></span>
//                         </div>
//                     </button>
//                     <div className="drawer-end">
//                     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//                     <div className="drawer-content">
//                         <label htmlFor="my-drawer" className="drawer-button material-icons">account_circle</label>
//                         {/* <span className="material-icons">
//                                 account_circle
//                             </span> */}
//                     </div>
//                     <div className="drawer-side">
//                         <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//                         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//                             {/* Sidebar content here */}
//                             <li><a>Sidebar Item 1</a></li>
//                             <li><a>Sidebar Item 2</a></li>
//                         </ul>
//                     </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }
