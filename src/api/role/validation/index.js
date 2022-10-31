const Joi = require('joi');

module.exports.createRole = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        scopes: Joi.array().min(1).max(8).required()
    }),
}
