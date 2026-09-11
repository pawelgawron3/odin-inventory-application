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
    SELECT t.id, t.name, t.description, t.price, t.stock, o.country, o.region
    FROM teas AS t JOIN origins AS o ON t.origin_id = o.id
    WHERE t.category_id = $1
  `;

  const { rows } = await pool.query(SQL, [categoryId]);
  return rows;
}

export const db = {
  getCategories,
  getCategory,
  getTeasByCategory,
};
