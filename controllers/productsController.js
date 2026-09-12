import { db } from "../db/queries.js";

const productsController = {
  async getProducts(req, res) {
    const teas = await db.getAllProducts();

    res.render("products", { teas });
  },

  async getProduct(req, res) {
    const teaId = req.params.id;

    const tea = await db.getProduct(teaId);

    res.render("product", { tea });
  },

  async getNewProductForm(req, res) {
    const categories = await db.getCategories();
    const origins = await db.getOrigins();

    res.render("new-product", { categories, origins });
  },

  async createProduct(req, res) {
    const { name, description, price, stock, category_id, origin_id } =
      req.body;

    await db.createTea(name, description, price, stock, category_id, origin_id);

    res.redirect("/products");
  },

  async getEditProduct(req, res) {
    const productId = req.params.id;

    const tea = await db.getProduct(productId);
    const categories = await db.getCategories();
    const origins = await db.getOrigins();

    res.render("edit-product", { tea, categories, origins });
  },

  async updateProduct(req, res) {
    const { name, description, price, stock, category_id, origin_id } =
      req.body;
    const productId = req.params.id;

    await db.editProduct(
      productId,
      name,
      description,
      price,
      stock,
      category_id,
      origin_id,
    );

    res.redirect("/products");
  },

  async deleteProduct(req, res) {
    const productId = req.params.id;

    await db.deleteProduct(productId);
    res.redirect("/products");
  },
};

export default productsController;
