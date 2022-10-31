const Joi = require('joi');
const pick = require('../utils/pick');

module.exports = (schema, req, res) => {
  const validSchema = pick(schema, ['query','params', 'query', 'body']);
  // console.log(validSchema)
  const object = pick(req, Object.keys(validSchema));
  console.log(object);
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    console.log(error);
    return res.status(400).send({message: errorMessage});
  }
  Object.assign(req, value);
  console.log("Iddarh")
  return true;
};

