const Schema = require("../validation");
const Validation = require("../../../middleware/validation");
const Services = require("../services");



module.exports.createSchool = async(req,res) => {
    try {
        const {value, error} = await Schema.createSchool.body.validate({...req.body});
        if(error) return res.status(400).send({message: error.message});
        const data = await Services.main.createSchool({
            ...req.body
        })
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

module.exports.getAll = async(req,res) => {
    try {
        const data = await Services.main.getSchool({...req.body});
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

module.exports.getAllStudent = async(req,res) => {
    try {
        const data = await Services.main.getSchool({getStudent: true});
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