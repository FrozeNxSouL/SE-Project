
import Link from "next/link";
import SignOutButton from "./signOut";
import CartCount from "./CartCount";
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
                <div className="navbar-center hidden lg:flex">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} className="btn m-1 btn-ghost text-base">
                            <span className="material-icons">sell</span>
                            <span>Category</span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {category.map((value, idx) => (
                                <li key={idx}><Link href={`/tag/${value.name}`}>{value.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Link href="/shop/product" className=" btn btn-ghost text-base">
                            <span className="material-icons">shopping_bag</span>
                            <span>Buy</span>
                        </Link>
                        <Link href="/add-product" className=" btn btn-ghost text-base">
                            <span className="material-icons">shopping_bag</span>
                            <span>Sell</span>
                        </Link>
                        <Link href="/shop/auction" className=" btn btn-ghost text-base">
                            <span className="material-icons">gavel</span>
                            <span>Auction</span>
                        </Link>
                    </div>

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
        </>

    )
}