import { db } from "../db/queries.js";

const categoriesController = {
  async getCategoryWithProducts(req, res) {
    const categoryId = req.params.id;

    const category = await db.getCategory(categoryId);
    const teas = await db.getTeasByCategory(categoryId);

    res.render("category", { category, teas });
  },
};

export default categoriesController;
