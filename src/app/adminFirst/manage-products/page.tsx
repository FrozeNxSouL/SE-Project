import Container from "@/component/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/app/action/getProducts";
import { getCurrentSession } from "@/lib/getCurrentSession";
import NullData from "@/component/NullData";

const ManageProducts = async () => {

    const products = await getProducts({category: null})
    const session = await getCurrentSession();
    const currentUser = session?.user

    if(!currentUser || currentUser.role !== "manager"){
        return <NullData title="Oops! ไอเหี้ยนี่มันพยายามจะเจาะระบบ" />
    }

    return  <div className="pt-8">
        <Container>
            <ManageProductsClient products = {products}/>
        </Container>
    </div>;
};
export default ManageProducts;