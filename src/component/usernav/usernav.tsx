import Link from "next/link"

export default function UserNav() {
    return (
        <ul className="menu bg-base-200 min-w-56 max-h-">
            <li><Link href="/user"><span className="material-icons">home</span>Overview</Link></li>
            <li>
                <details open>
                <summary><span className="material-icons">person</span>Account</summary>
                <ul>
                    <li><Link href="/user/editProfile">Edit profile</Link></li>
                    <li><Link href="/user/address">Address</Link></li>
                    <li><Link href="/user/changePassword">Change password</Link></li>
                </ul>
                </details>
            </li>
            <li><Link href="/user/mystore"><span className="material-icons">storefront</span>My store</Link></li>
            <li><Link href="/orders"><span className="material-icons">receipt_long</span>My purchase</Link></li>
        </ul>
    )
}