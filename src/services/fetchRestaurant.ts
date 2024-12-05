import axios from "axios";

const fetchRestaurant = async (page = 1) => {
    const response = await axios.get(`http://localhost:8000/api/restaurants?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    return response
}

export default fetchRestaurant;