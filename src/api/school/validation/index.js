const Joi = require('joi');

module.exports.createSchool = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required()
    }),
}
