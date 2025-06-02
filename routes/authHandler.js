const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../modules/userActions');
const { setCookieHeader } = require('../utilities/setHeaders');

router.post('/auth', async (req, res) => {
    const username = req.body.u;
    const password = req.body.k;
    const isMet = req.body.isMet;
    const response = await authenticateUser(username, password, isMet);
    if(response.acknowledged) {
        setCookieHeader(res, response);
        res.status(201).send({ message: response.message });
    } else {
        res.status(403).send({ message: response });
    }
    global.userObj = {...global.userObj, ...{[response.insertedId] : username}};
    console.log(`POST /auth ${response}`);
});

module.exports = router;