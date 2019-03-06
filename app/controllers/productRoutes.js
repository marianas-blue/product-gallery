const express = require('express');

const Products = require('../models/products');

const router = express.Router();

router.get('', async (req, res) => {
  const products = await Products.getAll();
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Products.getOne(id);
  product.rows[0].primary_image = product.rows[0].link;
  product.rows[0].secondary_image = product.rows[1].link;
  res.send(product.rows[0]);
});

module.exports = router;
