const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);

  const pythonProcess = spawn('python3', ['place_order.py']);

  // Send JSON payload via stdin
  pythonProcess.stdin.write(JSON.stringify(req.body));
  pythonProcess.stdin.end();

  let stdout = '';
  let stderr = '';

  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Python exited with code ${code}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Order failed');
    }
    console.log(`✅ Python output: ${stdout}`);
    res.send('Order processed');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
