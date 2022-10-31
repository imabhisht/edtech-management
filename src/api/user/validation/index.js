const Joi = require('joi');


module.exports.getUserUsingUID = {
    params: Joi.object().keys({
        id: Joi.string().uuid().required()
    }),
}

module.exports.createAccount = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        roleId: Joi.string().uuid().required(),
    }),
}

module.exports.signInAccount = { 
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    })
}

module.exports.getSingleStudent = {
    query: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}