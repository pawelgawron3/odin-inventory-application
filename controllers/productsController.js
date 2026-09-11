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
};

export default productsController;
