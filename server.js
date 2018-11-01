const express = require('express');
const passport = require('passport');
const cors = require('cors');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();
const port = process.env.PORT || 443;
const players = require('./routes/players');
const prices = require('./routes/prices');

passport.use(new BasicStrategy(
    function (username, password, done) {
        if (username === 'fifa-user' && password === 'XjEheBerh2') {
            return done(null, {username: username});
        } else {
            return done(null, false);
        }
    }
));
app.use(passport.initialize());
app.use(cors());
app.use('/api/players', players);
app.use('/api/prices', prices);


app.listen(port, () => console.log('Running....'));