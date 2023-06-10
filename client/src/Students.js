import './Students.css'
import axios from "axios"
import {useState, useEffect } from "react"
function Students(props){
    const [students, setStudents] = useState([])
    async function getStudents(){
        let response = await axios.get(process.env.REACT_APP_API_URL + "/students")
        setStudents(response.data)
    }

    async function addStudent(student){
        let studentObject = { ...student, description: ""}
        await axios.post(process.env.REACT_APP_API_URL, studentObject)
        let newQueue = [...props.queue, studentObject]
        props.setQueue(newQueue)
    }


    let studentsHTML = students.map((element)=>{
        return <div>
                    <img onClick={()=>{ addStudent(element) }} className="StudentOption" src={element.pictureURL}/>
               </div>
    })

    useEffect(()=>{
        getStudents()
    }, [])

    console.log(studentsHTML)

    return <div className="StudentsSelectBox">
        {studentsHTML}
    </div>
}

export default Students