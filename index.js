const express = require('express');
const bodyParser = require('body-parser');
const routerHandler = require('./routes/handler');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', routerHandler);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});