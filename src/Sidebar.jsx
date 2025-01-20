// Sidebar.js
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setSidebarHovered } from '../slices/sidebarSlice';
import Starred from '../components/Starred';
import ComposeEmail from './ComposeEmail';

const NavbarHeight = 64; // Height in pixels (h-16 in Tailwind)

function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarHovered = useSelector((state) => state.sidebar.isHovered);
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const [isMoreOpen, setMoreOpen] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  // Refs for GSAP animations (if used)
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  const handleCompose = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };

  const toggleMore = () => {
    setMoreOpen((prev) => !prev);
  };

  const handleStarredClick = () => {
    setShowStarred(true);
  };

  const handleMouseEnter = () => {
    dispatch(setSidebarHovered(true));
  };

  const handleMouseLeave = () => {
    dispatch(setSidebarHovered(false));
  };

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-[${NavbarHeight}px] inset-y-0 left-0 bg-white shadow-xl p-4 z-40 overflow-y-auto flex flex-col transition-all duration-300 ${
          isSidebarHovered ? 'w-64' : 'w-16'
        }`}
        style={{
          top: `${NavbarHeight}px`, // Position below Navbar
        }}
      >
        {/* Header Section */}
        <div className={`flex items-center justify-between mb-4 ${isSidebarHovered ? 'block' : 'hidden'}`}>
          <h2 className="text-xl font-bold">Menu</h2>
          {/* Optional Close Button */}
          {/* <button
            onClick={() => dispatch(toggleSidebar())}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button> */}
        </div>
        

        {/* Compose Button */}
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mb-6 ${
            isSidebarHovered ? 'block' : 'hidden'
          }`}
          type="button"
          onClick={handleCompose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 4h16v16H4z"></path>
            <path d="M4 10h16M8 4v8"></path>
          </svg>
          <span>Compose</span>
        </button>

        {/* Menu Items */}
        <ul className="space-y-2">
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined">draft</span>
            {isSidebarHovered && (
              <Link to="/draft" className="ml-4">
                Drafts
              </Link>
            )}
          </li>
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined">star</span>
            {isSidebarHovered && (
              <Link to="/starred" onClick={handleStarredClick} className="ml-4">
                Starred
              </Link>
            )}
          </li>
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined">snooze</span>
            {isSidebarHovered && <span className="ml-4">Snoozed</span>}
          </li>
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined">send</span>
            {isSidebarHovered && <span className="ml-4">Sent</span>}
          </li>
          <li>
            <button
              onClick={() => setMoreOpen(!isMoreOpen)}
              className="flex items-center justify-between w-full hover:bg-gray-100 p-2 rounded cursor-pointer focus:outline-none transition-all duration-200"
            >
              <span className="material-symbols-outlined">more_vert</span>
              {isSidebarHovered && (
                <span className="ml-4">
                  More {isMoreOpen ? '▲' : '▼'}
                </span>
              )}
            </button>
            {isMoreOpen && isSidebarHovered && (
              <ul className="pl-4 mt-2 space-y-1">
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200">
                  Spam
                </li>
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200">
                  Trash
                </li>
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200">
                  Important
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Starred Component */}
        {showStarred && <Starred />}

        {/* ComposeEmail Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full max-w-lg rounded-lg shadow-lg p-4">
              <ComposeEmail onClose={handleCloseCompose} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
