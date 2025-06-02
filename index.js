const express = require('express');
const bodyParser = require('body-parser');
const dataRouterHandler = require('./routes/dataHandler');
const authRouterHandler = require('./routes/authHandler');
const { setHeaders } = require('./utilities/setHeaders');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    setHeaders(res);
    next();
});
app.use('/', authRouterHandler);
app.use('/', dataRouterHandler);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});