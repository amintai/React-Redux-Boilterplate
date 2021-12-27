import TutorialService from "../services/TutorialService"

export const retriveStudents = () => async(dispatch) => {
    // debugger;
    const res = await TutorialService.getStudents()
    console.log("HHHHH",res.data);
    dispatch({
        type : "GET_STUDENTS",
        payload : res.data
    })
}