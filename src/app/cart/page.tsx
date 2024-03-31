import Container from "@/component/Container";
import React from "react";
import CartClient from "./CartClient";
import getCurrentUser from "../action/getCurentUser";

async function Cart() {
  return <div className="">
    <Container>
      <CartClient />
    </Container>
  </div>;
}

export default Cart;
