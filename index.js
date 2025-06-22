require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ Add this
const app = express();

app.use(cors());              // ✅ Enable CORS
app.use(express.json());

app.use('/block', require('./routes/block.routes'));
app.use('/auth', require('./routes/auth.routes'));

const { startBlockPolling } = require('./utils/block.listener');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  startBlockPolling(); 
});
