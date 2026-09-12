import { Router } from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/:id", categoryController.getProductsForCategory);

export default categoryRouter;
