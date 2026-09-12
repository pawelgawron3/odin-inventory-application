import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/new", productsController.getNewProductForm);
productsRouter.post("/new", productsController.createProduct);

productsRouter.get("/:id/edit", productsController.getEditProduct);
productsRouter.post("/:id/edit", productsController.updateProduct);

productsRouter.get("/:id", productsController.getProduct);

productsRouter.post("/:id/delete", productsController.deleteProduct);

export default productsRouter;
