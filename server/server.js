
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

app.get("/", function(request, response){
    response.send("test")
})

app.listen(3001, () => {
    console.log("Listening on port 3001")
})
