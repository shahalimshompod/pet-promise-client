import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";

const Root = () => {
  const { pathname } = useLocation();
  // Initialize dark mode state from localStorage
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("isDark");
    return savedMode === "true"; // Convert string to boolean
  });

  // Handle dark mode toggle
  const handleDark = () => {
    const newMode = !isDark;
    setIsDark(newMode); // Update state
    localStorage.setItem("isDark", newMode); // Save to localStorage
  };

  // Apply or remove the "dark" class on <body>
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <Navbar handleDark={handleDark} isDark={isDark} />
      <Outlet context={isDark} />
      <Footer />
    </div>
  );
};

export default Root;
