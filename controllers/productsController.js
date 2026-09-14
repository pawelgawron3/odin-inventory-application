import { db } from "../db/queries.js";

const productsController = {
  async getProducts(req, res) {
    const teas = await db.getAllTeas();

    res.render("products", { teas });
  },

  async getProduct(req, res) {
    const teaId = req.params.id;

    const tea = await db.getTea(teaId);
    if (!tea) {
      return res.status(404).render("404");
    }

    res.render("product", { tea });
  },

  async getNewProductForm(req, res) {
    const categories = await db.getCategories();
    const origins = await db.getOrigins();

    res.render("new-product", { categories, origins });
  },

  async createProduct(req, res) {
    const tea = req.body;

    await db.createTea(tea);

    res.redirect("/products");
  },

  async getEditProduct(req, res) {
    const teaId = req.params.id;

    const tea = await db.getTea(teaId);
    if (!tea) {
      return res.status(404).render("404");
    }
    const categories = await db.getCategories();
    const origins = await db.getOrigins();

    res.render("edit-product", { tea, categories, origins });
  },

  async updateProduct(req, res) {
    const tea = { id: req.params.id, ...req.body };

    await db.editTea(tea);

    res.redirect("/products");
  },

  async deleteProduct(req, res) {
    const teaId = req.params.id;

    await db.deleteTea(teaId);

    res.redirect("/products");
  },
};

export default productsController;
