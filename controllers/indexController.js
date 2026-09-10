import { db } from "../db/queries.js";

const indexController = {
  async getHomepage(req, res) {
    const rows = await db.getCategories();
    res.render("index", { rows });
  },
};

export default indexController;
