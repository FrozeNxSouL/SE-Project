import Container from "@/component/Container";
import React from "react";
import CartClient from "./CartClient";
import { getCurrentSession } from "@/lib/getCurrentSession";

async function Cart() {
  const currentUser = await getCurrentSession()
  return <div className="">
    <Container>
      <CartClient currentUser = {currentUser}/>
    </Container>
  </div>;
}

export default Cart;
