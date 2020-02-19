import loggedReducer from "./isLogged"
import currentProject from "./currentProject"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    isLoggedIn:loggedReducer,
    currentProject
})

export default allReducers