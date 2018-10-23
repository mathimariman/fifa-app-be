const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

router.get('/', passport.authenticate('basic'), (req, res) => {
    const playerId = req.query.playerId;
    if (playerId) {
        axios.get('https://www.futbin.com/19/playerPrices?player=' + playerId)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500);
            });
    } else {
        res.status(400).send('No player id specified')
    }
});

module.exports = router;