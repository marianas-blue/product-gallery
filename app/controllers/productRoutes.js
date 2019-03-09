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
  if (product.rows.length === 0) {
    res.status(404).end();
  } else {
    product.rows[0].primary_image = product.rows[0].link;
    product.rows[0].secondary_image = product.rows[1].link;
    delete product.rows[0].link;
    res.send(product.rows[0]);
  }
});

router.post('', async (req, res) => {
  const {
    name,
    category,
    manufacturer,
    primary_image,
    secondary_image,
    price,
    is_prime,
    description,
  } = req.body;

  const id = await Products.postOne(name, category, manufacturer, primary_image, secondary_image, price, is_prime, description);
  if (typeof id !== 'number') {
    res.status(404).end();
  } else {
    res.send({ id });
  }
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { problem_section, issue, comments } = req.body;
  await Products.postReport(id, problem_section, issue, comments);
  res.send({ id });
});

router.get('/:seller_id', async (req, res) => {
  const { seller_id } = req.params;
  const product = await Products.getSeller(seller_id);
  res.send(product);
});

router.get('/:product_name', async (req, res) => {
  const { product_name } = req.params;
  const product = await Products.getAllSellers(product_name);
  res.send(product);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Products.updateOne(id, data);
  if (result === 0) {
    res.status(204).end();
  } else {
    res.status(200).end();
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Products.deleteOne(id);
  if (result === 0) {
    res.status(204).end();
  } else {
    res.status(200).end();
  }
});

module.exports = router;
