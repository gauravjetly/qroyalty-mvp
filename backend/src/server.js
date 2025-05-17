 const express = require('express');
 const bodyParser = require('body-parser');

 const app = express();
 app.use(bodyParser.json());

 // POST /api/v1/qr/validate
 app.post('/api/v1/qr/validate', (req, res) => {
   res.status(501).json({ message: 'Not implemented' });
 });

 // POST /api/v1/points/earn
 app.post('/api/v1/points/earn', (req, res) => {
   res.status(501).json({ message: 'Not implemented' });
 });

 // POST /api/v1/points/redeem
 app.post('/api/v1/points/redeem', (req, res) => {
   res.status(501).json({ message: 'Not implemented' });
 });

 // GET /api/v1/users/:userId/points
 app.get('/api/v1/users/:userId/points', (req, res) => {
   res.status(501).json({ message: 'Not implemented' });
 });

 // GET /api/v1/users/:userId/transactions
 app.get('/api/v1/users/:userId/transactions', (req, res) => {
   res.status(501).json({ message: 'Not implemented' });
 });

 const port = process.env.PORT || 4002;
 app.listen(port, () => console.log(`QRoyalty backend listening on port ${port}`));