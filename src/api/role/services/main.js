const prisma = require("../../../db/prisma");
const bcrypt = require('bcrypt');

module.exports.createRole = async(event) => {
    try {
        return await prisma.role.create({
            data:{
                name: event.name,
                scopes: event.scopes
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports.getRole = async(event) => {
    try {
        return await prisma.role.findMany();
    } catch (error) {
        throw error;
    }
}
