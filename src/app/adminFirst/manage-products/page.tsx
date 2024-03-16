import Container from "@/component/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/app/action/getProducts";
import getCurrentUser from "@/app/action/getCurentUser";
import NullData from "@/component/NullData";

const ManageProducts = async () => {

    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

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