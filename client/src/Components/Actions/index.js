export const enterProject = (id) =>  {
    return  {
        type: 'ENTER_PROJECT', 
        payload: id
    }
}
export const enterUser = (id) => {
    return {
        type: "ENTER_USER",
        payload: id
    }
}