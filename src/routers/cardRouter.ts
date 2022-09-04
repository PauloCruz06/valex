import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCard } from "../controllers/cardController.js";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import validateCardSchema from "../schemas/validateCardSchema.js";

const cardRouter = Router();
cardRouter.post(
    "/cards",
    validateSchema(validateCardSchema),
    apiKeyValidation,
    createCard
);

export default cardRouter;