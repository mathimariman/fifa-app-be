const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.send('Searching:' + req.query.term);
});

module.exports = router;