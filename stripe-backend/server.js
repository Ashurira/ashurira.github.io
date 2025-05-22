require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const cartItems = req.body;

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name
      },
      unit_amount: item.price * 100
    },
    quantity: item.qty
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://your-site.com/thank-you',
      cancel_url: 'https://your-site.com/cart'
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));