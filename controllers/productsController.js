import { db } from "../db/queries.js";

const productsController = {
  async getProducts(req, res) {
    const teas = await db.getAllProducts();

    res.render("products", { teas });
  },
};

export default productsController;
