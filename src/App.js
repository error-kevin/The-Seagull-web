import React from "react";
import {
  Home,
  Signin,
  Unauthorised,
  Gallery,
  Pagenotfound,
  Products,
  Team,
  About,
  Signup,
  Contact,
  Sponsors,
  Careers,
} from "./Pages";
import Layout from "./components/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "./api/axios";
import RequireAuth from "./hooks/RequireAuth";
import PersistLogin from "./Pages/Sign-in/PersistLogin";

export const ROLES = {
  User: 10,
  Admin: 10000,
  Editor: 5000,
};

const App = () => {
  const backendconnect = async () => {
    try {
      const response = await axios.get("/connect", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
        console.log(err);
      } else {
        console.log("Registration Failed");
      }
    }
  };

  // backendconnect();

  return (
    <>
      <Routes>
        <Route className="Layout" path="/" element={<Layout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="/pagenotfound" element={<Pagenotfound />} />
          <Route path="/members" element={<Team />} />
          <Route path="/home" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/g" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedroles={[ROLES.User]} />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
