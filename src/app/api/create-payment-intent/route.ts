import Stripe from 'stripe'
import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'
import { CartProductType } from '@/app/product/[productId]/productInfo';
import getCurrentUser from '@/app/action/getCurentUser';
import { connect } from 'http2';
import { getManage } from '@/app/admin/fetch';
import { getCurrentSession } from '@/lib/getCurrentSession';
import { useCart } from '@/hooks/useCart';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY as string,
    {
        apiVersion: "2023-10-16",
    });


const calculateOrderAmount = async (items: CartProductType[]) => {
    const tax1 = await getManage();
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = ((item.price * item.quantity) * (tax1!.tax/100)) + item.price;

        return acc + itemTotal
    }, 0);

    return totalPrice;
};

export async function POST(request: Request) {
    const currentUser = await getCurrentSession()
    // const { handleSetTransactionID } = useCart();
    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, payment_intent_id } = body
    let total = Math.round(await calculateOrderAmount(items) * 100)

    const orderData = {
        user: { connect: { id: currentUser.user.id } },
        totalPrice: total / 100,
        currency: 'thb',
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items
    };

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, { amount: total }
            );
            // console.log(payment_intent_id, updated_intent)
            
            //update the order
            const peefill =  await prisma.transaction.findFirst({where: {paymentIntentId: payment_intent_id}})
            console.log("transaction_findFirst ", peefill)
            const [existing_order] = await Promise.all([
                // prisma.transaction.findFirst({
                //     where: { paymentIntentId: payment_intent_id }
                // }),

                prisma.transaction.update({
                    where: {
                        paymentIntentId: payment_intent_id,
                    },
                    data: {
                        totalPrice: total / 100,
                        products: items,
                    }
                })
            ])

            if (!existing_order) {
                return NextResponse.json({ error: 'Invalid Payment intent' }, { status: 400 });
            }

            return NextResponse.json({ paymentIntent: updated_intent });


        }

    } else {
        //create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "thb",
            automatic_payment_methods: { enabled: true },
        })
        
        //create the order
        orderData.paymentIntentId = paymentIntent.id

        const trans = await prisma.transaction.create({
            data: {
                user: { connect: { id: currentUser.user.id } },
                totalPrice: total / 100,
                currency: 'thb',
                status: "pending",
                deliveryStatus: "pending",
                paymentIntentId: paymentIntent.id,
                products: items
            }
        })

        // handleSetTransactionID(trans.id);

        return NextResponse.json({ paymentIntent });
    }

}