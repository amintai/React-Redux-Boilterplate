import TutorialService from "../services/TutorialService"

export const createTurorial = (title , body)  => async(dispatch) =>{
    try {
        const res = await TutorialService.create({
            title,
            body
        })

        dispatch({
            type : "CREATE_TUTORIAL",
            payload : res.data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err);
    }
}

export const retriveTutorials = () => async (dispatch) => {
    try {   
        const res = await TutorialService.getAll()
        console.log("🚀 ~ file: tutorials.js ~ line 24 ~ retriveTutorials ~ res", res)
        
        dispatch({
            type : "RETRIVE_TUTORIALS",
            payload : res.data,
        })
    } catch (err) {
        console.log(err);
    }
}

// we need id and data to update tutorial
export const updateTutorial = (id,data) => async(dispatch) => {
    try {
        const res = await TutorialService.update(id,data)
        
        dispatch({
            type : "UPDATE_TUTORIAL",
            payload : data
        })

        return Promise.resolve(res.data)
    } catch(err) {
        return Promise.reject(err)
    }
}

// we have to get the users search title and based on that will display data

export const findTutorialByTitle = (title) => async(dispatch) => {
    try{
        const res = await TutorialService.findByTitle(title)

        dispatch({
            type : "RETRIVE_TUTORIALS",
            payload : res.data
        })

    } catch(err) {
        console.log(err);
    }
}

export const deleteAllTutorials = () => async(dispatch) => {
    try {
        const res = await TutorialService.removeAll()
        console.log("🚀 ~ file: tutorials.js ~ line 70 ~ deleteAllTutorials ~ res", res)
        
        dispatch({
            type : "DELETE_ALL_TUTORIALS",
            payload : res.data
        })
       
    } catch(err) {
        console.log(err)
    }
}

export const deleteTutorial = (id) => async(dispatch) => {
    try {
        await TutorialService.remove(id)
        console.log("Delete Done",id)
        dispatch({
            type : "DELETE_TUTORIAL",
            payload : { id }
        })
    } catch(err) {
        console.log(err)
    }
}