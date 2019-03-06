const { Client } = require('pg');

const { database } = require('../../config');

const getAll = async () => {
  const client = new Client(database);
  await client.connect();
  const res = await client.query('SELECT * FROM products LIMIT 10');
  client.end();
  return res;
};

const getOne = async (id) => {
  const client = new Client(database);
  await client.connect();
  const res = await client.query(`
    SELECT * FROM products, images
    WHERE products.id=${id} and images.product_id=${id}
  `);
  client.end();
  return res;
};

module.exports = {
  getAll,
  getOne,
};
