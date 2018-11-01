const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

router.get('/', passport.authenticate('basic', {session: false}), (req, res) => {
    const playerIdsParameter = req.query.playerIds;
    if (playerIdsParameter) {
        const playerIds = playerIdsParameter.split(',');
        axios.get('https://www.futbin.com/19/playerPrices' + generateUrl(playerIds.slice()))
            .then(function (response) {
                const output = {};
                playerIds.forEach((playerId) => {
                    if (response.data[playerId]) {
                        output[playerId] = convertToNumber(response.data[playerId].prices.ps.LCPrice);
                    } else {
                        output[playerId] = 0;
                    }
                });
                res.send(output);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500);
            });
    } else {
        res.status(400).send('No player id specified')
    }
});

generateUrl = (playerIds) => {
    if (playerIds.length === 1) {
        return '?player=' + playerIds[0];
    } else {
        return '?player=' + playerIds.splice(0, 1) + '&all_versions=' + playerIds.join(',');
    }
};

convertToNumber = (playerPrice) => {
    if (isNaN(playerPrice)) {
        return +playerPrice.replace(/,/g, '');
    } else {
        return 0;
    }
}

module.exports = router;