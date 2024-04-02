import { Caramel } from "next/font/google";
import { DeleteButton, SearchButton, Taxchange, EditTag, AddTag, DeatailReport } from "./commandadmin"
import { getManage, getUser } from "./fetch";
import getCurrentUser from "../action/getCurentUser";
import { notFound, redirect } from "next/navigation";

export default async function admin({ searchParams }: { searchParams: { search?: string } }) {
  const currentuser = await getCurrentUser()
  const search = searchParams.search || "";
  const users = await getUser(search)
  const admin = await getManage();

  const session = await getCurrentUser();

  if (!admin || !session || session.role !== "manager") {
    notFound()
  }
  if (!admin) {
    notFound()
  }
  return (
    <div className="mx-auto w-2/3 bg-base-300">
      <div className="mx-auto w-full bg-base-100 shadow-lg">
        <div className="font-semibold p-5 border-b-2">
          <span>Manage</span>
        </div>
        <div className="flex flex-col p-5 items-center">
          <div className="flex flex-col w-full gap-3 justify-center my-10">
            <div className="flex items-center justify-center font-bold text-2xl mb-1">TAX</div>
            <div className="flex items-center justify-center text-6xl">{admin?.tax}%</div>
            {/* <div className="badge badge-primary h-10 ">Tax : {admin.tax}%</div> */}
            <Taxchange taxhandle={admin.tax}></Taxchange>
          </div>
          <div className="flex flex-col justify-center items-center w-5/6">
            <div className="flex justify-center">
              <div className="flex items-center justify-center font-bold text-2xl mb-1">Category</div>
            </div>
            <div className="flex flex-row flex-wrap gap-2 m-3">
              {admin.categorys.map((cat, index) => (
                <div key={cat.id}>
                  <EditTag catid={cat.id} catname={cat.name} caturl={cat.url}></EditTag>
                </div>
              ))}
              <AddTag adminid={admin.id}></AddTag>
            </div>
          </div>
        </div>
      </div>
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
                        <DeleteButton userid={user.id} username={user.name} props={user.report} product={user.product}></DeleteButton>
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
                      <DeatailReport data={user.report}></DeatailReport>
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