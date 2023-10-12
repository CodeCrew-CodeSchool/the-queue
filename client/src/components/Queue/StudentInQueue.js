import axios from "axios"
function StudentInQueue(props){
    return  <div>
                <h1>{props.name}</h1>
                {props.description && <h2>{props.description}</h2>}
            </div>
}

export default StudentInQueue
