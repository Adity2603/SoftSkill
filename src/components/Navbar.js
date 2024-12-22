import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ title }) {
  return (
    <nav className="bg-blue-500 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/vocabluary" className="text-white hover:text-blue-200">
              Vocabulary
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
