const express = require('express');
const players = require('./routes/players');
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/players', players);

app.listen(port, () => console.log('Running....'));