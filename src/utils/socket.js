const ProductManager = require('../managers/ProductManager');

function configureSocket(io) {
  io.on('connection', (socket) => {
    console.log('Cliente conectado vía WebSocket');

    socket.on('newProduct', async (product) => {
      await ProductManager.addProduct(product);
      const updated = await ProductManager.getAllProducts();
      io.emit('productsUpdated', updated);
    });

    socket.on('deleteProduct', async (id) => {
      await ProductManager.deleteProduct(id);
      const updated = await ProductManager.getAllProducts();
      io.emit('productsUpdated', updated);
    });
  });
}

module.exports = configureSocket;
