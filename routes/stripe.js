const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post('/payment', async (req, res) => {
    stripe.charges.create( 
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    )
    // const session = await stripe.checkout.sessions.create({
    // payment_method_types: ['card'],
    // line_items: [{
    //     price_data: {
    //     product: '{{PRODUCT_ID}}',
    //     unit_amount: 1500,
    //     currency: 'usd',
    //     },
    //     quantity: 1,
    // }],
    // mode: 'payment',
    // success_url: 'https://example.com/success',
    // cancel_url: 'https://example.com/cancel',
    // });

    //  res.status(200).json(session);
});

module.exports = router;