
import CartCount from "./CartCount";
import getCategory from "@/app/action/getCategory";
import SearchBox from "./searchBox";
import { revalidatePath } from "next/cache";
import UserProfile from "./userProfile";
import Link from "next/link";
import { webName } from "../variables";

export default async function NavBar() {
    const category = await getCategory();
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a href="/" className="btn btn-ghost text-xl">{webName}</a>
                </div>
                <div className="navbar-center hidden lg:flex w-1/3">
                    <SearchBox></SearchBox>
                </div>
                <div className="navbar-end">
                    <button className="btn">
                        <CartCount />
                    </button>
                    <UserProfile />
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
                            <li key={idx}><Link href={`/tag/${value.name}`}>{value.name}</Link></li>
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