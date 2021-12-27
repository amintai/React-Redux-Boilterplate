let initialState = []

const studentReducer = (students = initialState , action) => {
    switch(action.type) {
        case "GET_STUDENTS" :
            return [...students , action.payload]
        default :
            return students
    }
}

export default studentReducer
