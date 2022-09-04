export function validateSchema(schema) {
    const value = (req, res, next) => {
        const body = req.body;
        const { error } = schema.validate(body, { abortEarly: false });
        if (error) {
            return res
                .status(422)
                .send(error.details.map((detail) => detail.message));
        }
        next();
    };
    return value;
}
