import Joi from "joi";

const rechargeCardSchema = Joi.object({
    cardNumber: Joi.string().required(),
    cardAmount: Joi.number().min(1).required()
});

export default rechargeCardSchema;