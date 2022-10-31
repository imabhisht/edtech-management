const Joi = require('joi');


module.exports = async(schema, requestValue, res) => {
    try {
        const { value, error } = await schema.validate(requestValue);
        console.log(error);
        if(error) throw new Error(error.message);
        return value;
    } catch (error) {
        console.log("Here i am")
        throw new Error(error.message);
    }
}