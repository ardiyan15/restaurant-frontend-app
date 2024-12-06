import axios from "axios";

const fetchRestaurant = async ({
    page = 1,
    name,
    date,
    openingTime,
    closingTime,
    day
}: {
    page: number;
    name?: string;
    date?: string;
    openingTime?: string;
    closingTime?: string;
    day?: string
}) => {
    const params = {
        page,
        name,
        date,
        openingTime,
        closingTime,
        day
    }

    console.log(params)
    const response = await axios.get(`http://localhost:8000/api/restaurants`, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        params
    })
    return response
}

export default fetchRestaurant;