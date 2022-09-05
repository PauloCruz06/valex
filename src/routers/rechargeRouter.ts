import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import { rechargeCard } from "../controllers/rechargeController.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";

const rechargeRouter = Router();
rechargeRouter.post(
    "/recharge",
    validateSchema(rechargeCardSchema),
    apiKeyValidation,
    rechargeCard
);

export default rechargeRouter;