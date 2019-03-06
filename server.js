const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const app = express();

const productRoutes = require('./app/controllers/productRoutes');

// const seedScript = require('./app/helpers/seedingScript');

// seedScript();

app.use(compression());
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/dist`));
app.use('/api/products', cors(), productRoutes);

app.get('/api/bundle', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`);
});

app.get('/products/:id', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('*', (req, res) => {
  res.redirect('/products/1');
});

app.listen(3000);
console.log('Listening on localhost:80');
