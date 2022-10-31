const Joi = require('joi');

module.exports.createStudent = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        userId: Joi.string().uuid().required(),
        schoolId: Joi.string().uuid().required()
    }),
}
