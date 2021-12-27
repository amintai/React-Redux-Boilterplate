import { combineReducers } from "redux";
import tutorials from './tutorials'
import students from './students'

export default combineReducers({
    tutorials,
    students
});