import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md fixed w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">
          <Link
            to="/"
            className="hover:text-gray-300 transition-all duration-200"
          >
            Employee
          </Link>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-gray-300 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="hover:text-gray-300 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="hover:text-gray-300 transition-all duration-200"
          >
            Register
          </Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-indigo-700 py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="text-white hover:text-gray-300 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-all duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
