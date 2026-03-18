import Stripe from 'https://esm.sh/stripe@14'

Deno.serve(async (req) => {
  const { tier, email, company } = await req.json()

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
  })

  const priceId = tier === 'featured'
    ? Deno.env.get('STRIPE_PRICE_FEATURED')!
    : Deno.env.get('STRIPE_PRICE_STANDARD')!

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    metadata: { tier, company },
    success_url: `${req.headers.get('origin')}/annonsere?success=true`,
    cancel_url: `${req.headers.get('origin')}/annonsere?canceled=true`,
  })

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
