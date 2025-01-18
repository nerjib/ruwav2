import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-4 fixed top-0 left-0 h-screen">
      <h1 className="text-2xl font-bold mb-4">Project Manager</h1>
      <nav>
        {/* <ul>
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className="block py-2 px-4 hover:bg-gray-700">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/reports" className="block py-2 px-4 hover:bg-gray-700">
              Reports
            </Link>
          </li>
          <li>
            <Link to="/map" className="block py-2 px-4 hover:bg-gray-700">
              Map
            </Link>
          </li>
        </ul> */}
        <ul>
            <li>
                <a href="/" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
                </a>
            </li>
            <li>
                <a href="/projects" className="block py-2 px-4 hover:bg-gray-700">
                Projects
                </a>
            </li>
            <li>
                <a href="/reports" className="block py-2 px-4 hover:bg-gray-700">
                Reports
                </a>
            </li>
            <li>
                <a href="/map" className="block py-2 px-4 hover:bg-gray-700">
                Map
                </a>
            </li>
        </ul>

      </nav>
    </aside>
  );
};

export default Sidebar;