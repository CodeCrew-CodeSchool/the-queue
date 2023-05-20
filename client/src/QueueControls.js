import { Button, Form } from "react-bootstrap"

function QueueControls(props) {

    return <div className="footer">
                    <Form onSubmit={(event) => {
                        event.preventDefault()

                        let newStudentName = event.target[0].value
                        let newQueue = [...props.queue, newStudentName]
                        props.setQueue(newQueue)

                        event.target[0].value = ""
                    }}>
                        <Form.Control placeholder="Your Name" required={true}></Form.Control>
                        <Button type="submit" style={{ marginTop: "3%" }}>Join Queue</Button>
                    </Form>
            </div>
}

export default QueueControls