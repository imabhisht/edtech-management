const Schema = require("../validation");
const Validation = require("../../../middleware/validation");
const ValidationV2 = require("../../../middleware/validationV2");
const Services = require("../services");
const Joi = require("joi");



module.exports.createRole = async(req,res) => {
    try {
        // await Validation(Schema.createRole, req, res);
        console.log(req.body)
        const {value, error} = await Schema.createRole.body.validate({...req.body});
        if(error) return res.status(400).send({message: error.message});
        // await ValidationV2(Schema.createRole.body,req.body,res);
        const data = await Services.main.createRole({
            ...req.body
        })
        return res.status(200).send({
            status: true,
            content:{
                data
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
}

module.exports.getAll = async(req,res) => {
    try {
        const data = await Services.main.getRole({...req.body});
        return res.status(200).send({
            status: true,
            content:{
                data
            }
        });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}