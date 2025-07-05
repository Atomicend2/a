const { startBot } = require('./lib/bot');
startBot();
// ⚡ Dummy Express server for Render port binding
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🤖 ATOMICEND-XMD is alive!'));

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});
