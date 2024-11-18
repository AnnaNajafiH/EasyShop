import express from 'express';

export const keyRouter = express.Router();

// /api/keys/paypal
keyRouter.get('/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});

// sb stands for Sandbox mode (a testing mode provided by PayPal).