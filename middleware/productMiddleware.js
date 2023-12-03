const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Create a product (POST)
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Read all products (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Read a product by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a product (PUT)
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const [updatedCount, updatedProducts] = await Product.update(
      { name, description, price },
      { where: { id: productId }, returning: true }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProducts[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a product (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedCount = await Product.destroy({ where: { id: productId } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
