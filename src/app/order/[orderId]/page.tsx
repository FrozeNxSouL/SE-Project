import Container from "@/component/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/app/action/getOrderById";
import NullData from "@/component/NullData";

interface IParams {
    orderId?: string;
}

const Order = async({ params }: {params: IParams}) => {
    const order = await getOrderById(params);

    if(!order) return <NullData title="มึงยังไม่สั่ง แล้วมึงจะดูอะไร"></NullData>
    return (
        <div className="p-8">
            <Container>
                <OrderDetails order = {order} />
            </Container>
        </div>
    )
}

export default Order;