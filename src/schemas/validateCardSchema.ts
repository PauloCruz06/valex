import Joi from "joi";

const validateCardSchema: any = Joi.object({
    employeeId: Joi.number().min(1).required(),
    type: Joi.string().valid(
        'groceries',
        'restaurants',
        'transport',
        'education',
        'health'
    ).required()
});

export default validateCardSchema;