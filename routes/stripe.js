const router = require("express").Router();
const stripe = require("stripe")
('sk_test_51LhuSwKO96OPe2epIvsRmKunY665HQhNr6II64BMewHVY4XNB2WEhE61IOkjf6DudHUCS2fP5DbQIfxZSHiZbPqm00C1v0wcsw');

router.post("/payment", (req, res) => {

  
   stripe.charges.create(
    {
      source: 'tok_visa',
      amount:  req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(501).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;