const prisma = require("../../../db/prisma");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DbCode = require("../../../error/dbCode.json");

module.exports.createUserUsingEmailAndPassword = async(event) => {
    try {
        const hashedPassword = await bcrypt.hash(event.password, 10);

        return await prisma.user.create({
            data:{
                name: event.first_name + " " + event.last_name,
                email: event.email,
                password: hashedPassword, 
                mobile: event.mobile,
                role:{
                    connect:{
                        id: event.roleId
                    }
                }    
            }
        });
    } catch (error) {
        if(DbCode.hasOwnProperty(error.code) && error.code === 'P2002'){
            throw new Error(`${error.meta.target[0]} ${DbCode[error.code].message}`)
        }
        if(DbCode.hasOwnProperty(error.code) && error.code === 'P2025'){
            throw new Error(`${DbCode[error.code].message} User. Check Role Id Once Again!`)
        }
        throw error;
    }
}


module.exports.loginUserUsingEmailAndPassword = async(event) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: event.email
            },
            include:{
                role: true
            }
        });
        if(!user) throw new Error("User not Found!");
        const result = await bcrypt.compare(event.password,user.password);
        if(!result) throw new Error("Incorrect Password!");
        return user;


    } catch (error) {
        throw error;
    }
}


module.exports.getUser = async(event) => {
    try {
        return await event?.id ? await prisma.user.findUnique({
            where:{
                id: event.id
            }
        }) : await prisma.user.findMany();
    } catch (error) {
        throw error;
    }
}

module.exports.generateAccessToken = async(event) => {
    try {
        return await jwt.sign({
            sub: event.id,
            name: event.name,
            email: event.email,
            phone_number: event.mobile || null,
            iss: "TheInternetFolks",
            scopes: event.role.scopes,
            role: event.role.name
        }, process.env.SECRET_KEY,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME
        });

    } catch (error) {
        throw error;
    }
}