import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
     try {
          const { amount } = await req.json();

          const paymentIntent = await stripe.paymentIntents.create({
               amount: amount,
               currency: "usd",
               automatic_payment_methods: { enabled: true },
          });




          return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });

     } catch (error: any) {

          NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });

     };
};