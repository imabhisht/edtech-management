const Schema = require("../validation");
const Validation = require("../../../middleware/validation");
const Services = require("../services");



module.exports.createAccount = async(req,res) => {
    try {
        const {value, error} = await Schema.createAccount.body.validate({...req.body});
        if(error) return res.status(400).send({message: error.message});
        const data = await Services.main.createUserUsingEmailAndPassword({
            ...req.body,
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

module.exports.signInAccount = async(req,res) => {
    try {
        const {value, error} = await Schema.signInAccount.body.validate({...req.body});
        if(error) return res.status(400).send({message: error.message});

        const data = await Services.main.loginUserUsingEmailAndPassword({
            ...req.body,
        })

        const accessToken = await Services.main.generateAccessToken({
            ...data
        }) 

        delete data.role;
        return res.status(200).send({
            status: true,
            content:{
                data,
                accessToken
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
}


module.exports.getUser = async(req,res) => {
    try {
        if(req.params.id){
        const {value, error} = await Schema.getUserUsingUID.params.validate({...req.params});
        if(error) return res.status(400).send({message: error.message});
        }
        const data = await (req.params.id) ? await Services.main.getUser({...req.params}) : await Services.main.getUser();
        // if(req.query.id) data = await Services.main.getUser({...req.query})
        // else data = await Services.main.getUser();



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