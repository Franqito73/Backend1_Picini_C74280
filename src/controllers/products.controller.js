const ProductService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(parseInt(req.params.id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(parseInt(req.params.id));
    if (result) {
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
