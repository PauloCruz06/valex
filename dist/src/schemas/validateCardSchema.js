import Joi from "joi";
const validateCardSchema = Joi.object({
    employeeId: Joi.number().min(1).required(),
    type: Joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
export default validateCardSchema;
