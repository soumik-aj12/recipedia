import React, { useState } from "react";

import { useCookies } from "react-cookie";
import { Link,useNavigate } from "react-router-dom";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [btn,setBtn] = useState(false);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("UserID");
    navigate("/auth");
  };
  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-white font-bold font-dancing-script text-3xl">Recipedia</a>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
            {cookies.access_token?(<>
              <li><Link to="/create_recipe" className="text-white hover:text-gray-300">Create Recipe</Link></li>
            <li><Link to="/view_recipes" className="text-white hover:text-gray-300">View Recipes</Link></li>
            </>):""}
            {
              cookies.access_token?(<button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>):(<li><Link to="/auth" className="text-white hover:text-gray-300">Login/Register</Link></li>)
            }
            
          </ul>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-2 items-center">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
            {cookies.access_token?(<>
              <li><Link to="/create_recipe" className="text-white hover:text-gray-300">Create Recipe</Link></li>
            <li><Link to="/view_recipes" className="text-white hover:text-gray-300">View Recipes</Link></li>
            </>):""}
            {
              cookies.access_token?(<button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>):(<li><Link to="/auth" className="text-white hover:text-gray-300">Login/Register</Link></li>)
            }
          </ul>
        </div>
      )}
    </nav>
  );
}