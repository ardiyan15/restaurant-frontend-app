import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { email, password };
    const response = await login(payload);

    if (response) {
      navigate("/");
    } else {
      setError(true);
    }
  };

  return (
    <div className="container mt-5 col-6">
      <div className="card">
        <div className="card-body">
          {error && (
            <h6 className="alert alert-danger">Invalid Email or Password</h6>
          )}
          <h3 className="text-center">Form Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
