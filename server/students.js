const mongoose = require("mongoose")


const StudentSchema = new mongoose.Schema({
    name: String,
    pictureURL: String
})


const StudentModel = mongoose.model("Students", StudentSchema)

class StudentsObject{
    constructor(){
        mongoose.connect(process.env.MONGO_CONNECTION_STRING)
            .then(()=>{
                console.log("Sucessfully connected to Mongo...")
                mongoose.disconnect()
            })

            
    }

    async getStudents(){
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        let students = await StudentModel.find()
        await mongoose.disconnect()
        return students
    }

}

module.exports = StudentsObject