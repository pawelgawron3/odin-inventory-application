import { Router } from "express";
import originController from "../controllers/originController.js";

const originRouter = Router();

originRouter.get("/new", originController.getNewOriginForm);
originRouter.post("/new", originController.createOrigin);

export default originRouter;
