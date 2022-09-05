import Joi from "joi";

const onlinePurchaseSchema = Joi.object({
    cardNumber: Joi.string().required(),
    holderName: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cardCVV: Joi.string().required(),
    businessId: Joi.number().min(1).required(),
    amount: Joi.number().min(1).required()
});

export default onlinePurchaseSchema;