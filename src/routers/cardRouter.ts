import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    createCard, activateCard, blockCard, unblockCard
} from "../controllers/cardController.js";
import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import validateCardSchema from "../schemas/validateCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import blockCardValidateSchema from "../schemas/blockCardValidateSchema.js";

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
cardRouter.post(
    "/cards/blocked",
    validateSchema(blockCardValidateSchema),
    blockCard
);
cardRouter.post(
    "/cards/unblocked",
    validateSchema(blockCardValidateSchema),
    unblockCard
)

export default cardRouter;