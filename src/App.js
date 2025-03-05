import React, { useEffect } from "react";
import {
  Home,
  PersistLogin,
  Sponsors,
  About2,
  Products,
  Socket,
  Gallery,
  Privacy,
  Members,
  Events,
  Schedule,
  Contact,
  Signin,
  Signup,
  Registration,
  Dashboard,
  Unauthorised,
  Pagenotfound,
  Profile,
  ForgotPass,
  HonourGuide,
  Event_Page,
} from "./Pages";

import { Faq } from "./components";
import Layout from "./components/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hooks/RequireAuth";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";

export const ROLES = ["User", "Admin", "Developer", "Owner"];
export const targetDate = new Date("2024-10-09T12:00:00").getTime();

const App = () => {
  const { auth } = useAuth();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

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

  backendconnect();

  return (
    <>
      <Routes>
        <Route className="Layout" path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/products" element={<Products />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="/pagenotfound" element={<Pagenotfound />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/about" element={<About2 />} />
          <Route path="/members" element={<Members />} />
          <Route path="/HonouraryGuidance" element={<HonourGuide />} />
          <Route path="/h" element={<HonourGuide />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz/gdgoc-orientation" element={<Socket />} />
          <Route path="/s" element={<Socket />} />

          {/* Dynamic event route */}
          <Route path="/Events/:eventName" element={<Event_Page />} />

          <Route element={<PersistLogin />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<RequireAuth allowedroles={["Admin"]} />}>
              <Route path="/register" element={<Signup />} />
            </Route>
            <Route element={<RequireAuth allowedroles={["User"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
