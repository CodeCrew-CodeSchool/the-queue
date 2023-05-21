const express = require("express")
const cors = require("cors")
const redis = require('redis');
const bodyParser = require('body-parser')
const QueueObject = require("./queue")

const client = redis.createClient({ url: 'rediss://red-chkp6fu4dadfmsn42vug:mNQsZSfPXAhSv4DBnzJtMEUZiAGKAzVl@oregon-redis.render.com:6379' })
client.on('error', err => console.log('Redis Client Error', err));

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
    let studentName = request.query.name

    await queueObject.removeStudentFromQueue(studentName)

    response.send("OK")
})



app.listen(3001, () => {
    console.log("Listening on port 3001")
})
