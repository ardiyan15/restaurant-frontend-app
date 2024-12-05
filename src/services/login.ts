import axios from "axios"

const login = async (payload: object): Promise<boolean> => {
    const response = await axios.post("http://localhost:8000/api/login", payload)
    const { data } = response

    if (data.response_code === 200) {
        sessionStorage.setItem('token', data.data.token)
        sessionStorage.setItem('roles', data.data.roles)
        return true
    } else {
        return false
    }
}

export default login