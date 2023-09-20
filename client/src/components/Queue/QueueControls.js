import { Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import useQueueAPIClient from "../../clients/QueueAPI";
import { useState, useEffect } from "react";

function QueueControls(props) {
  const user = props.user;
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const QueueAPIClient = useQueueAPIClient();

  const [description, setDescription] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(true); // Added state for validation
  const [disableForm, setDisableForm] = useState(false);
  
  async function joinQueue(e) {
    e.preventDefault();
    if (description.trim() === "") {
      setIsDescriptionValid(false); // Set validation to false if the description is empty
      return; // Do not proceed if the description is empty
    }
    let userId = user.sub.split("|")[1];
    let studentObject = {
      email: user.email,
      name: user.given_name,
      description: description,
    };
    let oldQueue = [...props.queue];

    QueueAPIClient.post("/", studentObject).catch((error) => {
      console.log(error.message);
      props.setQueue(oldQueue);
      props.setStudentIsInQueue(false);
    });
    
    let newQueue = [...props.queue, studentObject];
    props.setQueue(newQueue);
    props.setStudentIsInQueue(true);
    setDisableForm(true);
    localStorage.setItem("disableForm", "true");
    console.log(user.name, user.description);
  }

  async function leaveQueue() {
    let userEmail = user.email;
    let oldQueue = [...props.queue];

    QueueAPIClient.delete("/", { params: { email: userEmail } }).catch(
      (error) => {
        console.log(error.message);
        props.setQueue(oldQueue);
        props.setStudentIsInQueue(true);
      }
    );
    let newQueue = props.queue.filter((student) => {
      if (student.email !== userEmail) {
        return true;
      } else {
        return false;
      }
    });
    props.setQueue(newQueue);
    props.setStudentIsInQueue(false);
    setDisableForm(false);
    localStorage.removeItem("disableForm");
  }

  useEffect(() => {
    // Check if there is a stored disableForm value in localStorage
    const storedDisableForm = localStorage.getItem("disableForm");
    if (storedDisableForm) {
      // If it exists, set the disableForm state based on the stored value
      setDisableForm(storedDisableForm === "true");
    }
  }, []); 
  
  return (
    <div className="QueueControls">
      {isAuthenticated && (
        <>
          <img className="ProfilePicture" src={user?.picture} />
            <Form>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>State Your Problem</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What is your problem?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  isInvalid={!isDescriptionValid} // Apply validation state
                  disabled={disableForm}
                />
                <Form.Control.Feedback type="invalid">
                  Description is required.
                </Form.Control.Feedback>
              </Form.Group>
               <Button
                onClick={!props.studentIsInQueue ? joinQueue : leaveQueue}
                className="EnqueueButton"
              >
                {!props.studentIsInQueue ? "Join Queue" : "Leave Queue"}
              </Button>
            </Form>  
        </>
      )}
      <Button
        onClick={isAuthenticated !== true ? loginWithRedirect : logout}
        className="AuthButton"
      >
        {isAuthenticated !== true ? "Login" : "Logout"}
      </Button>
    </div>
  );
}

export default QueueControls;