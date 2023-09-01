import { Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"
import useQueueAPIClient from "../../clients/QueueAPI"

function QueueControls(props){
    const user = props.user
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
    const QueueAPIClient  = useQueueAPIClient()
console.log("isAuthenticated", isAuthenticated)
    async function joinQueue(){
        let userId = user.sub.split("|")[1]
        let studentObject = {id: userId, name: user.given_name, description: ""}
        let oldQueue = [...props.queue]

        QueueAPIClient.post("/", studentObject).catch((error)=>{
            console.log(error.message)
            props.setQueue(oldQueue)
            props.setStudentIsInQueue(false)
        })

        let newQueue = [...props.queue, studentObject]
        props.setQueue(newQueue)
        props.setStudentIsInQueue(true)

    }


    async function leaveQueue(){
        let userId = user.sub.split("|")[1]
        let oldQueue = [...props.queue]

        QueueAPIClient.delete("/", {params: {id: userId}}).catch((error) =>{
            console.log(error.message)
            props.setQueue(oldQueue)
            props.setStudentIsInQueue(true)
        })
        let newQueue = props.queue.filter((student)=>{
            if(student.id !== userId){
                return true
            }else{
                return false
            }
        })
        props.setQueue(newQueue)
        props.setStudentIsInQueue(false)
    }


    return <div className="QueueControls">
                { isAuthenticated && (<>
                                        <img className="ProfilePicture" src={user?.picture} />
                                        <Button onClick={!props.studentIsInQueue ? joinQueue : leaveQueue} className="EnqueueButton">
                                            {!props.studentIsInQueue ? "Join Queue" : "Leave Queue"}
                                        </Button>
                                      </>)
                }
                <Button onClick={ isAuthenticated !== true ? loginWithRedirect: logout } className="AuthButton">
                    { isAuthenticated !== true ? "Login": "Logout" }
                </Button>
           </div>
}

export default QueueControls