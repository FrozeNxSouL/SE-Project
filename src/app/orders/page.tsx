import Container from "@/component/Container";
import OrdersClient from "./OrderClient";
import { getCurrentSession } from "@/lib/getCurrentSession";
import NullData from "@/component/NullData";
import getOrdersByUserId from "../action/getOrdersByUserId";

const Orders = async () => {

    const session = await getCurrentSession();
    const currentUser = session?.user

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