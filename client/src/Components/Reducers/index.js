import currentProject from "./currentProject"
import userInfo from "./userInfo"
import allProjects from "./allProjects"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    currentProject,
    userInfo,
    allProjects
})

export default allReducers