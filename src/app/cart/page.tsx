import Container from "@/component/Container";
import React from "react";
import CartClient from "./CartClient";
import getCurrentUser from "../action/getCurentUser";

async function Cart() {
  const currentUser = await getCurrentUser()
  return <div className="">
    <Container>
      <CartClient currentUser = {currentUser}/>
    </Container>
  </div>;
}

export default Cart;
