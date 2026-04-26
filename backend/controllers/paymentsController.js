const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { plan } = req.body; // 'premium' or 'annual'
    const amount = plan === 'annual' ? 79900 : 9900; // in paise

    const options = {
      amount,
      currency: 'INR',
      receipt: `studynest_${Date.now()}`,
      notes: { userId: req.user._id.toString(), plan },
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Update user plan
    const expiry = new Date();
    if (plan === 'annual') {
      expiry.setFullYear(expiry.getFullYear() + 1);
    } else {
      expiry.setMonth(expiry.getMonth() + 1);
    }

    await User.findByIdAndUpdate(req.user._id, {
      plan: plan === 'annual' ? 'annual' : 'premium',
      planExpiry: expiry,
      aiQueriesUsed: 0,
    });

    res.json({ success: true, message: 'Payment verified, plan upgraded!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
