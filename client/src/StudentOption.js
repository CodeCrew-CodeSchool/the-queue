import axios from "axios"
import { useState } from "react"

function StudentOption(props) {

    async function addStudent(student){
        let studentObject = { ...student, description: ""}
        await axios.post(process.env.REACT_APP_API_URL, studentObject)
        let newQueue = [...props.queue, studentObject]
        props.setQueue(newQueue)
    }

    return <div>
                <img onClick={() => { addStudent(props.student) }} className="StudentOption" src={props.student.pictureURL} />
           </div>
}

export default StudentOption