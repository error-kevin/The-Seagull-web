import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const container = document.getElementById("root");
const root = createRoot(container);

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a brief moment (you can adjust the duration as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // Change 1000 to your desired loading time in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<Index />);
