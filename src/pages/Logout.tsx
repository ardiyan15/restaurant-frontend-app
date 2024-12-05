import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    sessionStorage.clear()
    navigate('/auth')
    return <></>
};

export default Logout;
