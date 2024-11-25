import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./pages/Home"; // Import Home page
import SignIn from "./pages/SignIn"; // Import SignIn page
import Register from "./pages/Register"; // Import Register page
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <>
      <Navbar />
      {/* Define the Routes for your application */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </>
  );
};

export default App;
