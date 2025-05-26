const socket = io();

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const price = parseFloat(document.getElementById('price').value);

  socket.emit('newProduct', { title, price });

  form.reset();
});

socket.on('productsUpdated', (products) => {
  productList.innerHTML = '';
  products.forEach((p) => {
    productList.innerHTML += `<li>${p.title} - $${p.price} <button onclick="deleteProduct(${p.id})">Eliminar</button></li>`;
  });
});

function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}
