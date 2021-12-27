import React ,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { deleteAllTutorials, deleteTutorial, updateTutorial } from '../actions/tutorials';
import TutorialService from '../services/TutorialService'
import { useNavigate } from "react-router-dom";

const Tutorial = ({props}) => {
console.log("🚀 ~ file: Tutorial.js ~ line 8 ~ Tutorial ~ props", props)
    
    let params = useParams();
    const dispatch = useDispatch()    
    
    const nevigate = useNavigate()

    const initialTutorialState = {
        id : null,
        title : "",
        body : "",
        published : false
    }
    
    const [currentTutorial , setCurrentTutorial] = useState(initialTutorialState)
    const [message, setMessage] = useState("");

    const getTutorial = id => {
        console.log("id",id);
        TutorialService.get(id)
        .then(response => {
            setCurrentTutorial(response.data)
            console.log("rrr",response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        getTutorial(params.id)
    } , [params.id])

    const handleInputChange = event => {
        const { name , value } = event.target;
        setCurrentTutorial({
            ...currentTutorial,
            [name] : value
        })
    }

    
    const updateStatus = status => {
        const data = {
            id : currentTutorial.id,
            title : currentTutorial.title,
            body : currentTutorial.body,
            published : status
        }
        dispatch(updateTutorial(currentTutorial.id , data))   
        .then(response => {
            console.log("response",response);
            setCurrentTutorial({...currentTutorial , published : status})
            setMessage("Status Updated Succesfully....")
        })
        .catch(e => {
            console.log(e);
        })
    }
    
    const removeTutorial = () => {
        dispatch(deleteTutorial(currentTutorial.id))
        .then(() => {
            nevigate("/tutorials")
            console.log("done")
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <div>
            {
            currentTutorial ? (
                <div className="edit-form">
                    <h1>Tutorial</h1>
                    <form>
                        <div className="form-group">
                        <label>Title</label>
                        <input  type="text" 
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTutorial.title}
                                onChange={handleInputChange}    
                        />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="body"
                                name="body"
                                value={currentTutorial.body}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status :</strong>
                            </label>
                            {
                                currentTutorial.published ? "Published" : "pending"
                            }
                        </div>
                    </form>

                    {
                        currentTutorial.published ? (
                            <button onClick={() => updateStatus(false)} className="badge badge-primary mr-2">
                                UnPublished
                            </button>
                        ) : (
                            <button onClick={() => updateStatus(false)}  className="badge badge-primary mr-2">
                                Published
                            </button>
                        )
                    }

                    <button className="btn btn-danger" onClick={removeTutorial}>
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )
            }
        </div>
    )
}

export default Tutorial
