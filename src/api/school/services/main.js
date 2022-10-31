const prisma = require("../../../db/prisma");
const DbCode = require("../../../error/dbCode.json");
module.exports.createSchool = async(event) => {
    try {
        return await prisma.school.create({
            data:{
                name: event.name,
                city: event.city,
                state: event.state,
                country: event.country
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports.getSchool = async(event) => {
    try {
        if(event.getStudent) return await prisma.school.findMany({
            include:{
                student: true
            }
        });
        return await prisma.school.findMany();
    } catch (error) {
        throw error;
    }
}
