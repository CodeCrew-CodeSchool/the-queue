import { useEffect, useState } from "react"
import StudentInQueue from "./StudentInQueue"
import axios from "axios"
import Students from "./Students"
function Queue() {
    const [queue, setQueue] = useState([])

    async function updateQueue(){
        let response = await axios.get(process.env.REACT_APP_API_URL)
        let updatedQueue = response.data
        setQueue(updatedQueue)
    }

    async function removeStudentFromQueue(studentName){
        axios.delete(process.env.REACT_APP_API_URL + `?name=${studentName}`)
        let studentIndex = queue.findIndex((element) => {
            if(element.name === studentName){
                return true
            }else{
                return false
            }
        })
        if(studentIndex !== -1){
            queue.splice(studentIndex, 1)
        }
        let updatedQueue = [...queue]
        setQueue(updatedQueue)
    }

    let queueHTML = []

        queueHTML = queue.map((element) => {
            return <StudentInQueue removeStudentFromQueue={removeStudentFromQueue} name={element.name}/>

    })

    useEffect(() => {
        updateQueue()
    }, [])

    return  <div className="queue">

                <h1 style={{fontSize: 60, margin: 0}}> {queue?.length} </h1>

                <div className="students" style={{marginTop: "5vh"}}>
                    {queueHTML.length !== 0 ? queueHTML : <h2>Queue is empty</h2>}
                </div>

                <Students queue={queue} setQueue={setQueue}/>

            </div>
}

export default Queue