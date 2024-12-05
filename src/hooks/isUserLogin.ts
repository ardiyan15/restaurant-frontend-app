import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IsUserLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/auth");
        }
    }, [navigate]);
};
