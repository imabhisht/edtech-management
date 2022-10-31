const prisma = require("../../../db/prisma");
const DbCode = require("../../../error/dbCode.json");
module.exports.createStudent = async(event) => {
    try {
        return await prisma.student.create({
            data:{
                name: event.name,
                school:{
                    connect:{
                        id: event.schoolId
                    }
                },
                user:{
                    connect:{
                        id: event.userId
                    }
                }
            }
        })
    } catch (error) {

        if(DbCode.hasOwnProperty(error.code) && error.code === 'P2025'){
            throw new Error(`${DbCode[error.code].message} Student. Check School Id or User Id Once Again!`)
        }
        throw error;
    }
}

module.exports.getStudent = async(event) => {
    try {
        return await prisma.student.findMany();
    } catch (error) {
        throw error;
    }
}
