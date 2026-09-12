import pool from "./pool.js";

async function getOrigins() {
  const { rows } = await pool.query("SELECT * FROM origins");
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory(categoryId) {
  const SQL = `
    SELECT name, description
    FROM categories
    WHERE categories.id = $1
  `;

  const { rows } = await pool.query(SQL, [categoryId]);
  return rows[0];
}

async function getTeasByCategory(categoryId) {
  const SQL = `
    SELECT t.id, t.name, t.price, t.stock, o.country
    FROM teas AS t JOIN origins AS o ON t.origin_id = o.id
    WHERE t.category_id = $1
  `;

  const { rows } = await pool.query(SQL, [categoryId]);
  return rows;
}

async function getAllProducts() {
  const SQL = `
    SELECT c.name AS category, t.id, t.name, t.price, t.stock, o.country
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function getProduct(productId) {
  const SQL = `
    SELECT t.id, t.name, t.description, t.price, t.stock, t.category_id, t.origin_id, c.name AS category, o.country, o.region
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
    WHERE t.id = $1
  `;

  const { rows } = await pool.query(SQL, [productId]);

  return rows[0];
}

async function createTea(
  name,
  description,
  price,
  stock,
  category_id,
  origin_id,
) {
  const SQL = `
    INSERT INTO teas (name, description, price, stock, category_id, origin_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  await pool.query(SQL, [
    name,
    description,
    price,
    stock,
    category_id,
    origin_id,
  ]);
}

async function editProduct(
  productId,
  name,
  description,
  price,
  stock,
  category_id,
  origin_id,
) {
  const SQL = `
    UPDATE teas
    SET name = $2, description = $3, price = $4, stock = $5, category_id = $6, origin_id = $7
    WHERE id = $1
  `;

  await pool.query(SQL, [
    productId,
    name,
    description,
    price,
    stock,
    category_id,
    origin_id,
  ]);
}

async function deleteProduct(productId) {
  const SQL = `
    DELETE FROM teas
    WHERE id = $1
  `;

  await pool.query(SQL, [productId]);
}

export const db = {
  getOrigins,
  getCategories,
  getCategory,
  getTeasByCategory,
  getAllProducts,
  getProduct,
  createTea,
  editProduct,
  deleteProduct,
};
