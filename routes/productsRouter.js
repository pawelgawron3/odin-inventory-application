import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/new", productsController.getNewProductForm);
productsRouter.get("/:id/edit", productsController.getEditProduct);
productsRouter.get("/:id", productsController.getProduct);

productsRouter.post("/:id/edit", productsController.updateProduct);
// productsRouter.post("/:id/delete", productsController.deleteProduct);
productsRouter.post("/new", productsController.createProduct);

export default productsRouter;
