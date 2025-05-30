import api from "../../../api"


export const registerFetch = (user) => {
    return async (dispatch) => {
        console.log(user)
        const response = await api.post('/identity/api/account/register', user);
        console.log(response.data)
    }
}