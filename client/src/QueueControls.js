import { Button, Form } from "react-bootstrap"
import axios from "axios"
import Students from "./Students"

function QueueControls(props) {

    return <div className="footer">
                    <Students queue={props.queue} setQueue={props.setQueue}/>
            </div>
}

export default QueueControls