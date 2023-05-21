const express = require("express")
const cors = require("cors")
const app = express()
const expressWs = require("express-ws")(app)

app.use(cors())

var queue = []

app.use(function (request, response, next) {
    return next();
});


app.ws('/', function (ws, request) {
    ws.on('message', function (msg) {
        console.log(`Adding ${msg} to the queue...`)
        queue.push(msg);
    });
    console.log('socket', request.testing);
});

app.get('/', function (request, response, next) {
    response.send(queue)
});

app.listen(3001, () => {
    console.log("Listening on port 3001")
})
