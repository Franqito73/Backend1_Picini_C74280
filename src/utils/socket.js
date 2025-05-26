const ProductManager = require('../managers/ProductManager');
const manager = new ProductManager('products.json');

function configureSocket(io) {
  io.on('connection', (socket) => {
    console.log('Cliente conectado vía WebSocket');

    socket.on('newProduct', async (product) => {
      await manager.addProduct(product);
      const updated = await manager.getAllProducts();
      io.emit('productsUpdated', updated);
    });

    socket.on('deleteProduct', async (id) => {
      await manager.deleteProduct(id);
      const updated = await manager.getAllProducts();
      io.emit('productsUpdated', updated);
    });
  });
}

module.exports = configureSocket;