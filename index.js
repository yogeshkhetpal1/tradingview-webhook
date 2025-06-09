const express = require('express');
const app = express();

// Middleware to parse JSON from incoming requests
app.use(express.json());

// Webhook POST endpoint
app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  res.status(200).send('Webhook received!');
});

// Use the port assigned by Render or default to 10000
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
