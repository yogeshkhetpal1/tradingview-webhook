const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);

  const payload = JSON.stringify(req.body);

  const pyProcess = spawn('python3', ['place_order.py', payload]);

  let stdout = '';
  let stderr = '';

  pyProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  pyProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  pyProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Order failed: ${stderr || 'Unknown error'}`);
    }
    console.log(`Python script output: ${stdout}`);
    res.send('Order processed');
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
