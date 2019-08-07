const express = require('express');

const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;

// Middle-ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
