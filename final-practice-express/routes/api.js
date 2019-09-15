const express = require('express');

const router = express.Router();

const DB = require('../modules/db');

const db = new DB();
/* GET users listing. */
router.get('/products', async (req, res, next) => {
  const products = await db.read();
  res.json(products);
});

router.get('/products/:id', async (req, res, next) => {
  const product = await db.read(req.params.id);
  res.json(product[0]);
});

router.post('/products', async (req, res, next) => {
  await db.create(req.body);
  res.redirect('/products');
});

router.post('/products/:id', async (req, res, next) => {
  const result = await db.update(req.body);
  console.log(result);
  res.json(result);
});

router.delete('/products/:id', async (req, res, next) => {
  const result = await db.delete(req.params.id);
  res.json(result);
});
module.exports = router;
