import Stripe from 'stripe'
import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productId]/productInfo';
import getCurrentUser from '@/app/action/getCurentUser';
import { connect } from 'http2';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,
    {
        apiVersion: "2023-10-16",
    });

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        console.log(acc+itemTotal)

        return acc + itemTotal
    }, 0);
    
    return totalPrice;
};

async function callTrasaction(element : any,transaction : any){
    const updateProduct = await prisma.product.update({
        where: { id: element.id },
        data: { 
          Transaction: { connect: { id: transaction.id } },
        },
    })

    const findkuy = await prisma.product.findFirst({
        where: { id: element.id },
    })
    console.log(findkuy, "product T")
}

export async function POST(request: Request){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const body = await request.json()
    const {items, payment_intent_id} = body
    let total = Math.round(calculateOrderAmount(items) *100)

    const orderData = {
        user: {connect: {id: currentUser.id}},
        totalPrice: total/100,
        currency: 'thb',
        status: "pending",
        paymentIntentId: payment_intent_id,
    }

    if(payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, {amount: total}
            )
            //update the order
    
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'thb',
                automatic_payment_methods: {enabled: true}
            });
    
            //create the order
            orderData.paymentIntentId = paymentIntent.id
    
            const transactionOutput = await prisma.transaction.create({
                data: orderData,
            })
            console.log(transactionOutput.id,": transaction ID")
            items.forEach((element : any) => {
                callTrasaction(element,transactionOutput);

            });

            // console.log(body)
            // const [existing_order, update_order] = await Promise.all([
            //     prisma.transaction.findFirst({
            //         where: {paymentIntentId: payment_intent_id}
            //     }),
            //     prisma.transaction.update({
            //         where: {paymentIntentId: payment_intent_id},
            //         data: {
            //             totalPrice: total,
            //             products: items
            //         }
            //     })
            // ])
    
            // if(!existing_order){
            //     return NextResponse.json({error: 'Invalid Payment Intent'}, {status: 400});
            // }
    
            return NextResponse.json({ paymentIntent: updated_intent });
        }
    }else{
        // create the intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: total,
        //     currency: 'thb',
        //     automatic_payment_methods: {enabled: true}
        // });

        // //create the order
        // orderData.paymentIntentId = paymentIntent.id

        // await prisma.transaction.create({
        //     data: orderData,
        // })
        console.log("KUY POON")
        // return NextResponse.json({ paymentIntent });
    }
}