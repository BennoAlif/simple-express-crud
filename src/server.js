const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
