import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Import the hook to access theme context
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Destructure the theme and toggleTheme function from context

  const isDarkMode = theme === "dark"; // Check if the current theme is dark

  return (
    <label id="theme-toggle-button">
      <input
        type="checkbox"
        id="toggle"
        checked={isDarkMode}
        onChange={toggleTheme} // Toggle the theme when checkbox changes
      />
      <svg viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(3.5 3.5)" data-name="Component 15 – 1">
          <rect
            fill={isDarkMode ? "#37474F" : "#83cbd8"} // Change background based on theme
            rx="17.5"
            height="35"
            width="60.667"
          />
          <g transform="translate(2.333 2.333)" id="button">
            {isDarkMode ? (
              <g id="moon">
                <circle fill="#cce6ee" cx="15.167" cy="15.167" r="15.167" />
                {/* Moon patches */}
                <circle fill="#a6cad0" cx="20" cy="10" r="2" />
                <circle fill="#a6cad0" cx="30" cy="15" r="1" />
              </g>
            ) : (
              <g id="sun">
                <circle fill="#f8e664" cx="15.167" cy="15.167" r="15.167" />
                <circle fill="#fcf4b9" cx="15" cy="15" r="7" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </label>
  );
};

export default DarkModeToggle;
