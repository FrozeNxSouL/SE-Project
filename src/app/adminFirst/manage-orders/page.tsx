import Container from "@/component/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import getCurrentUser from "@/app/action/getCurentUser";
import NullData from "@/component/NullData";
import getOrders from "@/app/action/getOrders";

const ManageOrders = async () => {

    const orders = await getOrders();
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== "manager"){
        return <NullData title="Oops! ไอเหี้ยนี่มันพยายามจะเจาะระบบ" />
    }

    return  <div className="pt-8">
        <Container>
            <ManageOrdersClient orders = {orders}/>
        </Container>
    </div>;
};
export default ManageOrders;