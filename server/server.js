const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require('body-parser')
const QueueObject = require("./queue")
const StudentObject = require("./students")

const app = express()

app.use(cors())
app.use(bodyParser.json())

class Student {
    constructor(name, description) {
        this.name = name
        this.description = description
    }
}

let queueObject = new QueueObject()
let studentObject = new StudentObject()

app.get('/', async function (request, response, next) {
    let queueArray = await queueObject.getQueue()
    response.send(queueArray)
});

app.post('/', async function (request, response) {
    let studentName = request.body.name
    let description = request.body.description
    let student = new Student(studentName, description)
    await queueObject.addStudentToQueue(student)

    response.send("OK")
});

app.delete("/", async function(request, response){
    let studentId = request.query.id
    await queueObject.removeStudentFromQueue(studentId)
    response.send("OK")
})

app.get('/students', async function (request, response, next) {
    let students = await studentObject.getStudents()
    response.send(students)
});


app.listen(3001, () => {
    console.log("Listening on port 3001")
})
