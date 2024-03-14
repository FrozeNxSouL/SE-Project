export const metadata = {
    title: 'E-Shop Admin',
    description: 'E-Shop Admin Dashboard',
};

const AdminLayout = ({children}: {children: React.ReactNode}) =>{
    return ( 
        <div>
            {/* <div className="text-center font-bold text-4xl">KYA</div> */}
            {children}
        </div>
    );
}
export default AdminLayout