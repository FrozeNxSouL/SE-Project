import { Caramel } from "next/font/google";
import { DeleteButton, SearchButton, Taxchange, EditTag, AddTag } from "./commandadmin"
import { getManage, getUser } from "./fetch";
export default async function admin({ searchParams }: { searchParams: { search?: string } }) {
  const search = searchParams.search || "";
  const users = await getUser(search)
  const admin = await getManage()
  if (!admin) {
    return (<div>poon</div>)
  }
  console.log(admin)
  return (
    <div className="mx-auto w-2/3 bg-base-300">
      <div className="mx-auto w-full bg-base-100 shadow-lg">
        <div className="font-semibold p-5 border-b-2">
          <span>Manage</span>
        </div>
        <div className="p-5">
          <p>Tax : {admin?.tax}%</p>
          <p>catagory :</p>
          <div className="flex flex-row flex-wrap gap-2 m-3">
            {/* {admin.category.map((cat: any, index: number) => (
              <EditTag index={index} categoryHandle={admin?.category} />
            ))} */}
            {admin.categorys.map((cat, index) => (
              <tr key={index}>
                <EditTag catid={cat.id} catname={cat.name} caturl={cat.url}></EditTag>
              </tr>
            ))}
            <AddTag adminid={admin.id}></AddTag>
          </div>
          <Taxchange taxhandle={admin?.tax} categoryhandle={admin?.category}></Taxchange>
        </div>
      </div>
      {/* categoryhandle={admin?.category} */}
      {/* report Manage */}
      <div className="mx-auto w-full bg-base-100 shadow-lg mt-3">
        <div className="flex justify-between font-semibold p-5 border-b-2">
          <span>Report Manage</span>
          <SearchButton search={search}></SearchButton>
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
    </div >
  )
}
