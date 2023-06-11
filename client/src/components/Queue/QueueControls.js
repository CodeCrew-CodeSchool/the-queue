import { Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import QueueAPIClient from "../../clients/QueueAPI"
function QueueControls(props){
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
    
    async function joinQueue(){
        let studentObject = { name: user.given_name, description: ""}
        let oldQueue = [...props.queue]
        QueueAPIClient.post(studentObject).catch((error)=>{
            console.log(error.message)
            props.setQueue(oldQueue)
        })

        let newQueue = [...props.queue, studentObject]
        props.setQueue(newQueue)
    }

    console.log(user?.sub)
    return <div className="QueueControls">
                { isAuthenticated && (<>
                                        <img className="ProfilePicture" src={user?.picture} />
                                        <Button onClick={joinQueue} className="EnqueueButton">
                                            Join Queue
                                        </Button>
                                      </>)
                }
                <Button onClick={ isAuthenticated !== true ? loginWithRedirect: logout } className="AuthButton">
                    { isAuthenticated !== true ? "Login": "Logout" }
                </Button>
           </div>
}

export default QueueControls