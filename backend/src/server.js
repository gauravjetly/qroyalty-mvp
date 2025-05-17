 const express = require('express');
 const bodyParser = require('body-parser');

 const app = express();
app.use(bodyParser.json());

const qrCodes = new Map();
const userBalances = new Map();
const userTransactions = new Map();

// POST /api/v1/qr/validate
app.post('/api/v1/qr/validate', (req, res) => {
  const { qrPayload } = req.body;
  if (typeof qrPayload !== 'string' || !qrPayload) {
    return res.status(400).json({ message: 'Missing qrPayload' });
  }
  const record = qrCodes.get(qrPayload) || { used: false };
  if (record.used) {
    return res.status(400).json({ message: 'QR code already used or invalid' });
  }
  record.used = true;
  qrCodes.set(qrPayload, record);
  return res.status(200).json({ message: 'QR code valid' });
});

// POST /api/v1/points/earn
app.post('/api/v1/points/earn', (req, res) => {
  const { userId, transactionId } = req.body;
  if (!userId || !transactionId) {
    return res.status(400).json({ message: 'Missing userId or transactionId' });
  }
  const points = 1;
  const balance = userBalances.get(userId) || 0;
  userBalances.set(userId, balance + points);
  const tx = { type: 'earn', transactionId, points, timestamp: Date.now() };
  const txList = userTransactions.get(userId) || [];
  txList.push(tx);
  userTransactions.set(userId, txList);
  return res.status(200).json({ message: 'Points credited', points, balance: balance + points });
});

// POST /api/v1/points/redeem
app.post('/api/v1/points/redeem', (req, res) => {
  const { userId, rewardId } = req.body;
  if (!userId || !rewardId) {
    return res.status(400).json({ message: 'Missing userId or rewardId' });
  }
  const cost = 1;
  const balance = userBalances.get(userId) || 0;
  if (balance < cost) {
    return res.status(400).json({ message: 'Insufficient points' });
  }
  userBalances.set(userId, balance - cost);
  const tx = { type: 'redeem', rewardId, points: -cost, timestamp: Date.now() };
  const txList = userTransactions.get(userId) || [];
  txList.push(tx);
  userTransactions.set(userId, txList);
  return res.status(200).json({ message: 'Redemption successful', cost, balance: balance - cost });
});

// GET /api/v1/users/:userId/points
app.get('/api/v1/users/:userId/points', (req, res) => {
  const { userId } = req.params;
  const balance = userBalances.get(userId) || 0;
  return res.status(200).json({ points: balance });
});

// GET /api/v1/users/:userId/transactions
app.get('/api/v1/users/:userId/transactions', (req, res) => {
  const { userId } = req.params;
  const txList = userTransactions.get(userId) || [];
  return res.status(200).json({ transactions: txList });
});

 const port = process.env.PORT || 4002;
 app.listen(port, () => console.log(`QRoyalty backend listening on port ${port}`));