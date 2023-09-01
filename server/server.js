const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require('body-parser')
const TheQueue = require("./queue")
const Student = require("./Models/Student")
const app = express()

app.use(cors())
app.use(bodyParser.json())



let theQueue = new TheQueue()

app.get('/', async function (request, response, next) {
    let queueArray = await theQueue.getQueue()
    response.send(queueArray)
});

app.post('/', async function (request, response) {
    let studentName = request.body.name
    let description = request.body.description
    let email = request.body.email
    let student = new Student(studentName, description, email)
    await theQueue.addStudentToQueue(student)

    response.send("OK")
});

app.delete("/", async function(request, response){
    let studentEmail = request.query.email
    await theQueue.removeStudentFromQueue(studentEmail)
    response.send("OK")
})

app.get('/students', async function (request, response, next) {
    let students = await studentObject.getStudents()
    response.send(students)
});


app.listen(3001, () => {
    console.log("Listening on port 3001")
})
