import Container from "@/component/Container";
import OrdersClient from "./OrderClient";
import getCurrentUser from "@/app/action/getCurentUser";
import NullData from "@/component/NullData";
import getOrdersByUserId from "../action/getOrdersByUserId";
import { getProductByTransactionId } from "@/api/action/fetch";

const Orders = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <NullData title="Oops! Lonin first!" />
    }

    const orders = await getOrdersByUserId(currentUser.id)
    if(!orders){
        return <NullData title="You haven't ordered anythings yet..." />;
    }

    return  <div className="pt-8">
        <Container>
            <OrdersClient orders = {orders}/>
        </Container>
    </div>;
};
export default Orders;