import { useState } from "react"
import QueueControls from "./QueueControls"
import Student from "./Student"
function Queue() {
    const [queue, setQueue] = useState([])

    return  <div className="queue" style={{border: "4px solid black"}}>

                <h1 style={{fontSize: 60, margin: 0}}> {queue.length} </h1>

                <div className="students" style={{marginTop: "5vh"}}>
                    {queue.map((element) => {
                        return <Student name={element}/>
                    })}

                </div>

                <QueueControls queue={queue} setQueue={setQueue}/>

            </div>
}

export default Queue