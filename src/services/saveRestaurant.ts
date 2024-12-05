import axios from "axios";

const saveRestaurant = async (data: object) => {
    const response = await axios.post("http://localhost:8000/api/restaurant", data, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    return response
}

export default saveRestaurant;