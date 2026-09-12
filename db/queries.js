import pool from "./pool.js";

// Categories
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

// Origins
async function getOrigins() {
  const { rows } = await pool.query("SELECT * FROM origins");
  return rows;
}

// Teas
async function getAllTeas() {
  const SQL = `
    SELECT c.name AS category, t.id, t.name, t.price, t.stock, o.country
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
  `;

  const { rows } = await pool.query(SQL);
  return rows;
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

async function getTea(teaId) {
  const SQL = `
    SELECT t.id, t.name, t.description, t.price, t.stock, t.category_id, t.origin_id, c.name AS category, o.country, o.region
    FROM teas AS t JOIN categories AS c ON t.category_id = c.id JOIN origins AS o ON t.origin_id = o.id
    WHERE t.id = $1
  `;

  const { rows } = await pool.query(SQL, [teaId]);

  return rows[0];
}

async function createTea(tea) {
  const SQL = `
    INSERT INTO teas (name, description, price, stock, category_id, origin_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  await pool.query(SQL, [
    tea.name,
    tea.description,
    tea.price,
    tea.stock,
    tea.category_id,
    tea.origin_id,
  ]);
}

async function editTea(tea) {
  const SQL = `
    UPDATE teas
    SET name = $2, description = $3, price = $4, stock = $5, category_id = $6, origin_id = $7
    WHERE id = $1
  `;

  await pool.query(SQL, [
    tea.id,
    tea.name,
    tea.description,
    tea.price,
    tea.stock,
    tea.category_id,
    tea.origin_id,
  ]);
}

async function deleteTea(teaId) {
  await pool.query("DELETE FROM teas WHERE id = $1", [teaId]);
}

export const db = {
  getCategories,
  getCategory,
  getOrigins,
  getAllTeas,
  getTeasByCategory,
  getTea,
  createTea,
  editTea,
  deleteTea,
};
