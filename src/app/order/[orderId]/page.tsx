import Container from "@/component/Container";
import OrderDetails from "./OrderDetails";

interface IParams {
    orderId?: string;
}

const Order = ({ params }: {params: IParams}) => {
    return (
        <div className="p-8">
            <Container>
                <OrderDetails order = {order} />
            </Container>
        </div>
    )
}