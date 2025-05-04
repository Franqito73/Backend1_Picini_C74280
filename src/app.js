const express = require('express');
const app = express();
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.send('¡El server funcionda!');
});

module.exports = app;
