import { Link } from "react-router-dom";
import { IsAuthorize } from "../../hooks/isAuthorize";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={"/"} className="nav-item nav-link active">
              Home
            </Link>
            {IsAuthorize() && (
              <Link to={"/form"} className="nav-item nav-link">
                Add Restaurant
              </Link>
            )}
            <Link to={"/logout"} className="nav-item nav-link">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
