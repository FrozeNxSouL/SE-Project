import Container from "@/component/Container";
import React from "react";
import CartClient from "./CartClient";

async function Cart() {
  return <div className="max-w-screen-xl mx-auto bg-base-100 min-h-screen">
    <Container>
      <CartClient />
    </Container>
  </div>;
}

export default Cart;
