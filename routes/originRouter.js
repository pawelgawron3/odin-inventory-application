import { Router } from "express";
import originController from "../controllers/originController.js";

const originRouter = Router();

originRouter.get("/", originController.getOrigins);

originRouter.get("/new", originController.getNewOriginForm);
originRouter.post("/new", originController.createOrigin);

originRouter.post("/:id/delete", originController.deleteOrigin);

export default originRouter;
