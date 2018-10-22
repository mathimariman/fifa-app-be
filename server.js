const express = require('express');
const players = require('./routes/players');
const prices = require('./routes/prices');
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/players', players);
app.use('/api/prices', prices);

app.listen(port, () => console.log('Running....'));