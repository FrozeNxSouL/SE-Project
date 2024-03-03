import Stripe from 'stripe'
import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,
    {
        apiVersion: "2023-10-16",
    });

const calculateOrderAmount = () =>{
    
}