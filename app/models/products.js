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

const postOne = async (name, category, manufacturer, primaryImage, secondaryImage, price, isPrime, description) => {
  const client = new Client(database);
  await client.connect();
  const result = await client.query(`INSERT INTO products (name, category, manufacturer, price, is_prime, description) VALUES ('${name}', '${category}', '${manufacturer}', ${price}, ${isPrime}, '${description}') RETURNING id`);
  const { id } = result.rows[0];
  await client.query(`INSERT INTO images (link, product_id) VALUES ('${primaryImage}', ${id})`);
  await client.query(`INSERT INTO images (link, product_id) VALUES ('${secondaryImage}', ${id})`);
  client.end();
  return id;
};

const postReport = async (id, problemSection, issue, comments) => {
  const client = new Client(database);
  await client.connect();
  await client.query(`INSERT INTO reports (product_id, problem_section, issue, comments) VALUES ('${id}', '${problemSection}', '${issue}', '${comments}')`);
  client.end();
};

const getSeller = async (id) => {
  const client = new Client(database);
  await client.connect();
  const res = await client.query(`SELECT * FROM sellers WHERE id=${id}`);
  client.end();
  return res;
};

const getAllSellers = async (name) => {
  const client = new Client(database);
  await client.connect();
  const res = await client.query(`SELECT * FROM products WHERE name=${name}`);
  client.end();
  return res;
};

const updateOne = async (id, data) => {
  const {
    name,
    category,
    manufacturer,
    primary_image,
    secondary_image,
    price,
    is_prime,
    description,
  } = data;
  const client = new Client(database);
  await client.connect();
  await client.query(`UPDATE products SET name='${name}', category='${category}', manufacturer='${manufacturer}', price=${price}, is_prime=${is_prime}, description='${description}' WHERE id=${id}`);
  const result = await client.query(`SELECT id FROM images WHERE product_id=${id}`);
  const idOne = result.rows[1].id;
  const idTwo = result.rows[0].id;
  await client.query(`UPDATE images SET link='${primary_image}' WHERE product_id=${idOne}`);
  await client.query(`UPDATE images SET link='${secondary_image}' WHERE product_id=${idTwo}`);
  client.end();
};

const deleteOne = async (id) => {
  const client = new Client(database);
  await client.connect();
  await client.query(`DELETE FROM images WHERE product_id=${id}`);
  await client.query(`DELETE FROM products WHERE id=${id}`);
  client.end();
};

module.exports = {
  getAll,
  getOne,
  postOne,
  postReport,
  getSeller,
  getAllSellers,
  updateOne,
  deleteOne,
};
