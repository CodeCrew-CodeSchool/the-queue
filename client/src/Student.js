import axios
 from "axios"
function Student(props){
    return  <div onClick={async () => {
                axios.delete(process.env.REACT_APP_API_URL + `?name=${props.name}`)
                props.removeStudentFromQueue(props.name)
            }}>
                <h1>{props.name}</h1>
            </div>
}

export default Student
