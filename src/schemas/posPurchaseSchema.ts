import Joi from "joi";

const posPurchaseSchema = Joi.object({
    cardId: Joi.number().min(1).required(),
    password: Joi.string().required(),
    businessId: Joi.number().min(1).required(),
    amount: Joi.number().min(1).required()
});

export default posPurchaseSchema;