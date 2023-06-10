import { useEffect, useState } from "react"
import QueueControls from "./QueueControls"
import Student from "./Student"
import axios from "axios"
function Queue() {
    const [queue, setQueue] = useState(undefined)

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
    if(queue !== undefined){
        queueHTML = queue.map((element) => {
            return <Student removeStudentFromQueue={removeStudentFromQueue} name={element.name}/>
        })
    }

    useEffect(() => {
        if(queue === undefined){
            updateQueue()
        }
    }, [queue])

    return  <div className="queue" style={{border: "4px solid black"}}>

                <h1 style={{fontSize: 60, margin: 0}}> {queue?.length} </h1>

                <div className="students" style={{marginTop: "5vh"}}>
                    {queueHTML.length !== 0 ? queueHTML : <h2>Queue is empty</h2>}
                </div>

                <QueueControls queue={queue} setQueue={setQueue}/>

            </div>
}

export default Queue