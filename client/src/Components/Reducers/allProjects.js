const allProjects = (state = '', action) =>  {
    switch(action.type) {
        case 'ENTER_ALLPROJECTS': 
            return action.payload

        default: 
            return state
    }

}
export default allProjects
