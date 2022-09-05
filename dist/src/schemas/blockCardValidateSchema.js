import Joi from 'joi';
const blockCardValidateSchema = Joi.object({
    cardNumber: Joi.string().required(),
    password: Joi.string().required()
});
export default blockCardValidateSchema;
