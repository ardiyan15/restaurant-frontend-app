import React from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import FormRestaurant from "./pages/FormRestaurant";
import { Route, Routes } from "react-router-dom";
import { IsUserLogin } from "./hooks/isUserLogin";
import Logout from "./pages/Logout";
import Forbidden from "./pages/Forbidden";

const App: React.FC = () => {
  IsUserLogin();
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormRestaurant />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </>
  );
}

export default App;
