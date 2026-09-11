import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/:id", categoriesController.getCategoryWithProducts);

export default categoriesRouter;
