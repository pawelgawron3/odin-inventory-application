import { db } from "../db/queries.js";

const PSQL_UNIQUE_VIOLATION = "23505";
const PSQL_FOREIGN_KEY_VIOLATION = "23503";

const originController = {
  async getOrigins(req, res) {
    const origins = await db.getOrigins();

    res.render("origins", { origins, error: null });
  },

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

  async deleteOrigin(req, res) {
    const originId = req.params.id;

    try {
      await db.deleteOrigin(originId);

      res.redirect("/origins");
    } catch (err) {
      if (err.code === PSQL_FOREIGN_KEY_VIOLATION) {
        const origins = await db.getOrigins();

        return res.status(400).render("origins", {
          origins,
          error:
            "This origin cannot be deleted because it is used by existing teas.",
        });
      }

      throw err;
    }
  },
};

export default originController;
