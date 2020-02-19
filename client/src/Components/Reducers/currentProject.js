const currentProject = (state = '', action) =>  {
    switch(action.type) {
        case 'ENTER_PROJECT': 
            return action.payload

        default: 
            return state
    }

}
export default currentProject
