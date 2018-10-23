const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();
const port = process.env.PORT || 3000;
const players = require('./routes/players');
const prices = require('./routes/prices');

passport.use(new BasicStrategy(
    function (username, password, done) {
        if (username === 'fifa-user' && password === 'XjEheBerh2') {
            console.log('user OK');
            return done(null, {username: 'mathi'});
        } else {
            console.log('user NOT ok');
            return done(null, false);
        }
    }
));
app.use(passport.initialize());

app.use('/api/players', players);
app.use('/api/prices', prices);


app.listen(port, () => console.log('Running....'));