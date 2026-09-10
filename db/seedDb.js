#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
INSERT INTO categories (name, description)
VALUES
    ('Green Tea', 'Fresh and delicate teas with a light, refreshing taste.'),
    ('Black Tea', 'Fully oxidized teas with a strong and rich flavor.'),
    ('White Tea', 'Delicate teas with a subtle and naturally sweet taste.'),
    ('Oolong Tea', 'Partially oxidized teas with complex and aromatic flavors.');

INSERT INTO origins (country, region)
VALUES
    ('Japan', 'Shizuoka'),
    ('China', 'Fujian'),
    ('India', 'Assam'),
    ('Sri Lanka', 'Nuwara Eliya');

INSERT INTO teas (name, description, price, stock, category_id, origin_id)
VALUES
    (
        'Sencha',
        'Traditional Japanese green tea with a fresh and grassy flavor.',
        12.99,
        25,
        1,
        1
    ),
    (
        'Earl Grey',
        'Classic black tea flavored with bergamot.',
        9.99,
        40,
        2,
        3
    ),
    (
        'Silver Needle',
        'Premium white tea with a delicate and slightly sweet taste.',
        18.99,
        15,
        3,
        2
    ),
    (
        'Da Hong Pao',
        'Famous Chinese oolong tea with a rich and roasted flavor.',
        24.99,
        10,
        4,
        2
    );
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  });

  const { rows } = await client.query("SELECT COUNT(*) FROM categories");
  if (Number(rows[0].count) > 0) {
    console.log("Database already seeded.");
    await client.end();
    return;
  }

  console.log("seeding...");

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("seeding done!");
}

main();
