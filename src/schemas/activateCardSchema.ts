import Joi from 'joi';

const activateCardSchema = Joi.object({
    cardId: Joi.number().min(1).required(),
    cardCVV: Joi.string().required(),
    password: Joi.string().required()
});

export default activateCardSchema;