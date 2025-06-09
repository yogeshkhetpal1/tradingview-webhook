const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);

  const payload = JSON.stringify(req.body);

  exec(`python3 place_order.py '${payload}'`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Exec error: ${error.message}`);
      return res.status(500).send('Order failed');
    }
    if (stderr) console.error(`⚠️ STDERR: ${stderr}`);
    console.log(`✅ STDOUT: ${stdout}`);
    res.send('Order processed');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
