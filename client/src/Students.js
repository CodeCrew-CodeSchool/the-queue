import './Students.css'
import axios from "axios"
import StudentOption from './StudentOption'
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
        let isQueued = props.queue.some((student) => {
            if(element.name === student.name){
                return true
            }else{
                return false
            }
        })
        return <StudentOption 
                    student={element} 
                    isQueued={isQueued} 
                    queue={props.queue}
                    setQueue={props.setQueue}/>
    })

    useEffect(()=>{
        getStudents()
    }, [])

    return <div className='footer'>
                <div className="StudentsSelectBox">
                    {studentsHTML}
                </div>
            </div>
}

export default Students