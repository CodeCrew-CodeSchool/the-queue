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
                <img onClick={() => {
                    if(props.isQueued !== true){
                        addStudent(props.student)
                    }
                }} className={`StudentOption ${props.isQueued ? "StudentOptionSelected" : "StudentOptionNotSelected"}`} src={props.student.pictureURL} />
           </div>
}

export default StudentOption