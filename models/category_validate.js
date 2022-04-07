const Joi = require('joi')

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(category);
}

exports.validate = validateCategory;