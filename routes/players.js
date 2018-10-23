const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

router.get('/search', passport.authenticate('basic', {session: false}), (req, res) => {
    const playerName = req.query.playerName;
    if (playerName) {
        const searchTerm = JSON.stringify({name: playerName});
        axios.get('https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=' + searchTerm)
            .then(function (response) {
                res.send(response.data.items);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500);
            });
    } else {
        res.status(400).send('No term specified')
    }
});

module.exports = router;