import Container from "@/component/Container";
import FormWrap from "@/component/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () =>{
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    );
}

export default Checkout;