const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db.js');
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const configureSocket = require('./utils/socket');

connectDB();


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 

configureSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  helpers: {
    multiply: (a, b) => a * b
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

module.exports = httpServer;
