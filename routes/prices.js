const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    axios.get('https://www.futbin.com/19/playerPrices?player=' + req.params.id)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500);
        });
});

module.exports = router;