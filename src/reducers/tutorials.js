
const initialState = [];
const tutorialReducer = (tutorials = initialState , action) => {
    console.log(action.payload);
    switch(action.type) {
        case "CREATE_TUTORIAL" :
            return [...tutorials , action.payload]
        case "RETRIVE_TUTORIALS" :
            return action.payload
        case "UPDATE_TUTORIAL" :
            return tutorials.map((tutorial) => {
                if(tutorial.id === action.payload.id) {
                    return {
                        ...tutorial,
                        ...action.payload
                    }
                } else {
                    return tutorial
                }
            })
        case "DELETE_TUTORIAL":
            return tutorials.filter(({ id }) => id !== action.payload.id)
        case "DELETE_ALL_TUTORIALS" :
            return [];
        default :
            return tutorials
    }

}
export default tutorialReducer