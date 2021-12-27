import React ,{ useEffect , useState} from 'react'
import { findTutorialByTitle, retriveTutorials , deleteAllTutorials} from '../actions/tutorials'
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TutorialsList = () => {
    const tutorials = useSelector(state => state.tutorials)
    
    const dispatch = useDispatch()
    
    const [currentTutorial , setCurrentTutorial ] = useState(null)
    const [searchTitle , setSearchTitle] = useState("")
    const [currentIndex , setCurrentIndex] = useState(-1)

    useEffect(() => {
        dispatch(retriveTutorials())
    }, [])

    const onChangeSearchTitle = (event) => {
        const searchTitle = event.target.value
        setSearchTitle(searchTitle)
    }
    
    const refreshData = () => {
        setCurrentTutorial(null)
        setCurrentIndex(-1)
    }

    const findByTitle = () => {
        console.log(searchTitle);
        refreshData()
        dispatch(findTutorialByTitle(searchTitle))
    }

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial)
        setCurrentIndex(index)
        console.log("tutorial",tutorial);
    }

    const removeAllTutorials = () => {
        dispatch(deleteAllTutorials())
        refreshData()
    }

    return (
        <div className="list row"> 
            <div className="col-md-8">
            <div className="input-group mb-3">
            
            <input 
                type="text"
                className="form-control"
                placeholder="Search By Title"
                value = {searchTitle}
                onChange = {onChangeSearchTitle}    
            />
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-secondary"
                    type ="button"
                    onClick={findByTitle}
                >
                    Search
                </button>
            </div>
             </div>
            </div>
            
        <div classNames="col-md-3">
           <h1> Tutorials List </h1> 
           <ul  className="list-group">
               {
                   tutorials && tutorials.map((tutorial , index) => (
                       <li className={
                           "list-group-item" + (index === currentIndex ? "active" : "")
                       } key={index} onClick={() => setActiveTutorial(tutorial,index)}>
                           {tutorial.title}
                       </li>
                   ))
                }
           </ul>

           <button className="btn btn-danger" onClick={removeAllTutorials}>Remove All</button>
        </div>

        <div classNames="col-md-3">
            {
                currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title : </strong>
                                {currentTutorial.title}
                            </label>
                        </div>
                        <div>
                            <label>
                                <strong>Description : </strong>
                                {currentTutorial.body}
                            </label>
                        </div>
                        <div>
                            <label>
                                <strong>Status : </strong>
                                {
                                    currentTutorial.published ? "published" : "pending"
                                }
                            </label>
                        </div>

                        <Link to={"/tutorials/" + currentTutorial.id} className="btn btn-primary">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )
            }
        </div>

        </div>
        
    )
}

export default TutorialsList
