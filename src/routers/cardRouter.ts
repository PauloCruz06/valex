import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCard, activateCard } from "../controllers/cardController.js";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import validateCardSchema from "../schemas/validateCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";

const cardRouter = Router();
cardRouter.post(
    "/cards",
    validateSchema(validateCardSchema),
    apiKeyValidation,
    createCard
);
cardRouter.post(
    "/cards/activate",
    validateSchema(activateCardSchema),
    activateCard
);

export default cardRouter;