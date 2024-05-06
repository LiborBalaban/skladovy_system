const router = require('express').Router();
const getCheckToken = require('./getCheckToken');

router.get("/get-checktoken", getCheckToken, (req, res) => {
    return res.json({
        message: "You are authenticated"
    }) 
});

module.exports = router;

