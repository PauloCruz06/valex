import Joi from 'joi';

const idValidateSchema = Joi.object({
    cardId: Joi.string().pattern(/^[0-9]+/).required()
});

export default idValidateSchema;