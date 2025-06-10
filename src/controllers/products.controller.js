const ProductService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query, available } = req.query;

    const filter = {};

    if (query) {
      filter.$or = [
        { category: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } }
      ];
    }

    if (available !== undefined) {
      if (available === 'true') {
        filter.stock = { $gt: 0 };
      } else if (available === 'false') {
        filter.stock = 0;
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' || sort === 'desc' ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      lean: true,
    };

    const result = await ProductService.getAllProducts(filter, options);

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = result;

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const queryParams = new URLSearchParams({ ...req.query });

    queryParams.set('page', prevPage);
    const prevLink = hasPrevPage ? `${baseUrl}?${queryParams.toString()}` : null;

    queryParams.set('page', nextPage);
    const nextLink = hasNextPage ? `${baseUrl}?${queryParams.toString()}` : null;

    res.status(200).json({
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    res.status(500).json({
      status: 'error',
      error: 'Error al obtener los productos',
    });
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
