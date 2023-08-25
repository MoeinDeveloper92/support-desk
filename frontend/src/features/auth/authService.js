import axios from "axios"
const API_URL = "/api/users"


//Register function
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}


//Login user
const login = async (userData) => {

}

const authService = {
    register,
    login
}


export default authService