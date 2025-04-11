import React, { useState } from "react";
import { Moon, Search, Sun, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import Notifications from "@/components/Notifications";
import Logo from "@/assets/logo.webp";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 shadow-2xl bg-gradient-to-r from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-500">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo and Title */}
        <div className="flex items-center  pl-12 gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-auto transform hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-xl md:text-2xl pl-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-pulse">
            Achievement Hub
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="relative px-3 py-2 text-lg font-medium group"
          >
            
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500 blur-sm"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Dashboard
            </span>
          </Link>
          <Link
            to="/add-event"
            className="relative px-3 py-2 text-lg font-medium group"
          >
            
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500 blur-sm"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Add Achievement
            </span>
          </Link>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <Search
            className="text-gray-600 dark:text-gray-300 cursor-pointer transform hover:scale-125 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
          />
          <Notifications />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg group"
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6 text-white absolute inset-0 m-auto group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-300 absolute inset-0 m-auto group-hover:rotate-180 transition-transform duration-500" />
            )}
          </button>

          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

          <button className="flex items-center space-x-3 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 shadow-md transform group-hover:scale-110 transition-transform duration-300">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              Sign In/Sign Up
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center bg-gradient-to-b from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 py-6 space-y-6">
          <Link
            to="/"
            className="relative px-4 py-2 text-lg font-medium group"
            onClick={toggleMobileMenu}
          >
            
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500 blur-sm"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Dashboard
            </span>
          </Link>
          <Link
            to="/add-event"
            className="relative px-4 py-2 text-lg font-medium group"
            onClick={toggleMobileMenu}
          >
            
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500 blur-sm"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Add Achievement
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Search
              className="text-gray-600 dark:text-gray-300 cursor-pointer transform hover:scale-125 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
            />
            <Notifications />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg group"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6 text-white absolute inset-0 m-auto group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-300 absolute inset-0 m-auto group-hover:rotate-180 transition-transform duration-500" />
              )}
            </button>
          </div>
          <button className="flex items-center space-x-3 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 shadow-md transform group-hover:scale-110 transition-transform duration-300">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              Sign In/Sign Up
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;