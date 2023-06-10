import { Button, Form } from "react-bootstrap"
import axios from "axios"
import Students from "./Students"

function QueueControls(props) {

    return <div className="footer">
                    <Form onSubmit={async (event) => {
                        event.preventDefault()

                        let studentName = event.target[0].value
                        let student = { name: studentName, description: ""}
                        axios.post(process.env.REACT_APP_API_URL, student)
                        let newQueue = [...props.queue, student]
                        props.setQueue(newQueue)

                        event.target[0].value = ""
                    }}>
                        <Form.Control placeholder="Your Name" required={true}></Form.Control>
                        <Button type="submit" style={{ marginTop: "3%" }}>Join Queue</Button>
                    </Form>
                    <Students/>
            </div>
}

export default QueueControls