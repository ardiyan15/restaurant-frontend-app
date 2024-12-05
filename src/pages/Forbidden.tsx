import { Link } from "react-router-dom"

const Forbidden = () => {
    return (
        <div className="container text-center mt-3">
            <h3 className="text-danger">Not Authorize</h3>
            <Link to={'/'} className="text-decoration-none">Back To Home</Link>
        </div>
    )
}

export default Forbidden