import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { posPayment, onlinePayment } from "../controllers/paymentController.js";
import posPurchaseSchema from "../schemas/posPurchaseSchema.js";
import onlinePurchaseSchema from "../schemas/onlinePurchaseSchema.js";

const paymentRouter = Router();
paymentRouter.post(
    "/payment/pos",
    validateSchema(posPurchaseSchema),
    posPayment
);
paymentRouter.post(
    "/payment/online",
    validateSchema(onlinePurchaseSchema),
    onlinePayment
);

export default paymentRouter;