
import getUser from "./fetch";
export default async function admin(){ 
  const users = await getUser()
  return (
    <><div className="flex justify-center text-2xl font-bold mb-4">
      <h1>USER-MANAGE</h1>
    </div>
      <div className="flex justify-center mb-2">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="w-96" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              < tr >
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={users.picture} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{users.name}</div>
              
                  </div>
                </div>
              </td>
              <td>{users.email}</td>
              <td>{users.score}</td>
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
            <th>Score</th>
            <th></th>
          </tr>
        </tfoot>

      </table>
    </div ></>
  )
}
