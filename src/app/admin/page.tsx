import {DeleteButton} from "./commandadmin"
import {getUser} from "./fetch";
export default async function admin(){ 
  const users = await getUser()
  return (
    <div className="mx-auto w-2/3 bg-base-300">
      <div className="mx-auto w-full bg-base-100 shadow-lg">
        <div className="font-semibold p-5 border-b-2">
          <span>Manage user</span>
        </div>
        <div className="p-5">
          
        </div>
      </div>
      <div className="mx-auto w-full bg-base-100 shadow-lg mt-3">
        <div className="flex justify-between font-semibold p-5 border-b-2">
          <span>Manage user</span>
          <label className="input input-bordered input-sm flex items-center gap-2">
            <input type="text" className="grow bg-transparent" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>UserID</th>
                <th>Score</th>
                <th>Report</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                <th>
                  <label>
                    <DeleteButton userid={user.id} username={user.name}></DeleteButton>
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.picture} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.id}</td>
                <td>{user.score}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>UserID</th>
              <th>Score</th>
              <th>Report</th>
              <th></th>
            </tr>
          </tfoot>

        </table>
          </div>
        </div>
      </div>
    </div>
  )
}
