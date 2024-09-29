import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Appbar({ username }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    navigate('/signup');
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showDropdown]);

  return (
    <div className="shadow-xl h-14 flex justify-between items-center px-4"> 
      <div className="font-bold">
        PayMate
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          Hello
        </div>
        <div className="relative dropdown">
          <div 
            className="rounded-full h-12 w-12 gradient  flex items-center justify-center cursor-pointer border-2 border-gray-500" 
            onClick={toggleDropdown}
          >
            <span className="text-xl text-black">{username[0].toUpperCase()}</span>
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 gradient rounded-md shadow-lg z-10">
              <ul>
                <li 
                  className="px-4 py-2  cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
