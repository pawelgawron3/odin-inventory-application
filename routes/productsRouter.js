import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/new", productsController.getNewProductForm);
productsRouter.get("/:id", productsController.getProduct);

productsRouter.post("/new", productsController.createProduct);

export default productsRouter;
