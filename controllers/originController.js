import { db } from "../db/queries.js";

const PSQL_UNIQUE_VIOLATION = "23505";

const originController = {
  getNewOriginForm(req, res) {
    res.render("new-origin", { error: null, origin: null });
  },

  async createOrigin(req, res) {
    const origin = req.body;

    try {
      await db.createOrigin(origin);

      res.redirect("/products/new");
    } catch (err) {
      if (err.code === PSQL_UNIQUE_VIOLATION) {
        return res.status(400).render("new-origin", {
          error: "This origin already exists!",
          origin,
        });
      }

      throw err;
    }
  },
};

export default originController;
