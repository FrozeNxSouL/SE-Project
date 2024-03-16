
import Link from "next/link";
import SignOutButton from "./signOut";
import CartCount from "./CartCount";
import getCurrentUser from "@/app/action/getCurentUser";
import getCategory from "@/app/action/getCategory";
import { getCurrentSession } from "@/lib/getCurrentSession";

export default async function NavBar() {
    const session = await getCurrentSession();
    const category = await getCategory();

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a href="/" className="btn btn-ghost text-xl">Nitid Company</a>
                </div>
                <div className="navbar-center hidden lg:flex w-1/3">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input type="text" className="grow bg-transparent" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
                <div className="navbar-end">
                    <button className="btn">
                        <CartCount />
                    </button>
                    {session ? (
                        <div className="dropdown dropdown-hover dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">
                                <span className="material-icons">person</span>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <div className="mx-auto flex flex-col">
                                    <div className="avatar mx-auto">
                                        <div className="w-16 rounded-full">
                                            <img src={session.user?.image || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                        </div>
                                    </div>
                                    <span className="text-center">{session.user?.name}</span>
                                </div>
                                <div className="divider"></div>
                                <li><a href="/user">Account</a></li>
                                <li><a href="/user/mystore">My store</a></li>
                                <li><a href="/orders">My purchase</a></li>
                                <div className="divider"></div>
                                <li><a href="/admin">Admin</a></li>
                                <SignOutButton />
                            </ul>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="btn btn-primary btn-outline">sign in</Link>
                    )}
                </div>
            </div>
            <div className="navbar bg-base-100 flex justify-center gap-3">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} className="btn m-1 btn-ghost text-base">
                        <span className="material-icons">sell</span>
                        <span>Category</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {category.map((value, idx) => (
                            <li key={idx}><Link href={`/${value.url}`}>{value.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <Link href="/" className=" btn btn-ghost text-base">
                    <span className="material-icons">shopping_bag</span>
                    <span>Buy</span>
                </Link>
                <Link href="/add-product" className=" btn btn-ghost text-base">
                    <span className="material-icons">shopping_bag</span>
                    <span>Sell</span>
                </Link>
                <Link href="/shop" className=" btn btn-ghost text-base">
                    <span className="material-icons">gavel</span>
                    <span>Auction</span>
                </Link>
            </div>
        </>

    )
}