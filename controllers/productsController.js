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
};

export default productsController;
