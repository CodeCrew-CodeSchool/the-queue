import { Button, Form } from "react-bootstrap"
import axios from "axios"
import Students from "./Students"

function QueueControls(props) {

    return <Students queue={props.queue} setQueue={props.setQueue}/>
            
}

export default QueueControls