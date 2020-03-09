import loggedReducer from "./isLogged"
import currentProject from "./currentProject"
import userInfo from "./userInfo"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    isLoggedIn:loggedReducer,
    currentProject,
    userInfo
})

export default allReducers