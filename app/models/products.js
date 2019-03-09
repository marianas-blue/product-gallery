const { Pool } = require('pg');

const { database } = require('../../config');

const client = new Pool(database);
client.connect();

const getAll = async () => {
  const res = await client.query('SELECT * FROM products LIMIT 10');
  return res;
};

const getOne = async (id) => {
  const res = await client.query(`
    SELECT * FROM products, images
    WHERE products.id=${id} and images.product_id=${id}
  `);
  return res;
};

const postOne = async (name, category, manufacturer, primaryImage, secondaryImage, price, isPrime, description) => {
  const res = await client.query(`INSERT INTO products (name, category, manufacturer, price, is_prime, description) VALUES ('${name}', '${category}', '${manufacturer}', ${price}, ${isPrime}, '${description}') RETURNING id`);
  const { id } = res.rows[0];
  await client.query(`INSERT INTO images (link, product_id) VALUES ('${primaryImage}', ${id})`);
  await client.query(`INSERT INTO images (link, product_id) VALUES ('${secondaryImage}', ${id})`);
  return id;
};

const postReport = async (id, problemSection, issue, comments) => {
  await client.query(`INSERT INTO reports (product_id, problem_section, issue, comments) VALUES ('${id}', '${problemSection}', '${issue}', '${comments}')`);
};

const getSeller = async (id) => {
  const res = await client.query(`SELECT * FROM sellers WHERE id=${id}`);
  return res;
};

const getAllSellers = async (name) => {
  const res = await client.query(`SELECT * FROM products WHERE name=${name}`);
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
  await client.query(`UPDATE products SET name='${name}', category='${category}', manufacturer='${manufacturer}', price=${price}, is_prime=${is_prime}, description='${description}' WHERE id=${id}`);
  const res = await client.query(`SELECT id FROM images WHERE product_id=${id}`);
  if (res.rows.length === 0) return 0;
  const idOne = res.rows[1].id;
  const idTwo = res.rows[0].id;
  await client.query(`UPDATE images SET link='${primary_image}' WHERE product_id=${idOne}`);
  await client.query(`UPDATE images SET link='${secondary_image}' WHERE product_id=${idTwo}`);
};

const deleteOne = async (id) => {
  const res1 = await client.query(`DELETE FROM images WHERE product_id=${id}`);
  const res2 = await client.query(`DELETE FROM products WHERE id=${id}`);
  return res1.rowCount + res2.rowCount;
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
