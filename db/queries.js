import pool from "./pool.js";

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
    SELECT c.name AS category, t.id, t.name, t.description, t.price, t.stock, o.country, o.region
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function getProduct(productId) {
  const SQL = `
    SELECT t.id, t.name, t.description, t.price, t.stock, c.name AS category, o.country, o.region
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
    WHERE t.id = $1
  `;

  const { rows } = await pool.query(SQL, [productId]);

  return rows[0];
}

export const db = {
  getCategories,
  getCategory,
  getTeasByCategory,
  getAllProducts,
  getProduct,
};
