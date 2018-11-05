const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

router.get('/', (req, res) => {
  const playerIdsParameter = req.query.playerIds;
  if (!playerIdsParameter) {
    return res.status(400).send('No player id specified');
  }

  const playerIds = playerIdsParameter.split(',');
  axios
    .get(`https://www.futbin.com/19/playerPrices${generateUrl(playerIds)}`)
    .then(function(response) {
      const output = playerIds.reduce((acc, playerId) => {
        return {
          ...acc,
          [playerId]: response.data[playerId]
            ? convertToNumber(response.data[playerId].prices.ps.LCPrice)
            : 0
        };
      }, {});
      res.send(output);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500);
    });
});

generateUrl = playerIds => {
  if (playerIds.length === 1) {
    return '?player=' + playerIds[0];
  } else {
    return `?player=${playerIds[0]}&all_versions=${playerIds.slice(1).join(',')}`;
  }
};

convertToNumber = playerPrice => {
  return isNaN(playerPrice) ? +playerPrice.replace(/,/g, '') : 0;
};

module.exports = router;
