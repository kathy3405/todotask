import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w 7x1 px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-white font-bold hover:animate-pulse hover:text-indigo-100 px-6"
              >
                <h1 className="text-2xl">Task Manager</h1>
              </Link>

              <ul className="transition flex hover:-translate-y-1 hover:scale-60 duration-200">
                <li>
                  <Link to="/" className="text-white px-2 py-1 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new"
                    className="text-white px-2 py-1 hover:underline"
                  >
                    Create Task
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
