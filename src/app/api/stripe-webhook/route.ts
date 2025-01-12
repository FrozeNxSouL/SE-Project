import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"



const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY as string, {
    apiVersion: '2023-10-16'
})

export async function POST(
    req: Request,
    res: Response
){
    const buf = await req.text();
    const sig = req.headers.get("Stripe-Signature");

    if(!sig){
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    let event: Stripe.Event

    try{
        event = Stripe.webhooks.constructEvent(
            buf, sig, process.env.STRIPE_WEBHOOK_SECRET!
        );
    }catch(err){
        
        return NextResponse.json("Webhook error" + err, { status: 400 });
    }

    switch(event.type){
        case 'charge.succeeded':
            const charge: any = event.data.object as Stripe.Charge

            if(typeof charge.payment_intent === 'string'){
                await prisma?.transaction.update({
                    where: {paymentIntentId: charge.payment_intent},
                    data: {status: 'complete', address: charge.shipping?.address}
                });
            }
            break
            default:
                console.log('Unhandled event type:' + event.type)
    }

    return NextResponse.json({received: true});
}