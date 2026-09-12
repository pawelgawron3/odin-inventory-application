import { db } from "../db/queries.js";

const homeController = {
  async getHomepage(req, res) {
    const categories = await db.getCategories();
    res.render("home", { categories });
  },
};

export default homeController;
