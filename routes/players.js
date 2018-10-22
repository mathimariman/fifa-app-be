const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', (req, res) => {
    if (req.query.term) {
        const searchTerm = JSON.stringify({name: req.query.term});
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