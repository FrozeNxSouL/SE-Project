"use client"
export default function ChangePassword() {
    return (
        <div className="flex flex-col items-center bg-base-200 w-full p-5">
            <div className="divider text-2xl font-bold">Change password</div>
            <div className="flex flex-row p-5 w-full justify-center">
                <div className="space-y-2 w-full">
                    <label className="input input-bordered flex items-center gap-2">
                        Current password
                        <input type="text" className="grow bg-transparent" placeholder="" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Password
                        <input type="password" className="grow bg-transparent" placeholder="" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Confirm password
                        <input type="password" className="grow bg-transparent" placeholder="" />
                    </label>
                </div>
            </div>
            <button className="btn btn-primary btn-wide">confirm</button>
        </div>
    )
}
