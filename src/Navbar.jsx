// src/components/Navbar.jsx
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from '../slices/sidebarSlice';

const NavbarHeight = 64; // Height in pixels (h-16 in Tailwind)

const Navbar = ({ searchTerm, setSearchTerm, isSidebarHovered }) => {
  const navRef = useRef(null);
  const menuIconRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [hoverMenu, setHoverMenu] = useState(false);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    // Fade in the navbar on page load
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", borderRadius: "10px" }
    );

    // Add hover effect for the menu icon
  //   gsap.to(menuIconRef.current, {
  //     scale: hoverMenu ? 1.2 : 1,
  //     rotate: hoverMenu ? 90 : 0,
  //     duration: 0.5,
  //     ease: "power2.out",
  //   });
  }, []);

  const handleNotificationHover = () => {
    gsap.to(notificationRef.current, {
      scale: 1.2,
      rotate: 15,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleNotificationLeave = () => {
    gsap.to(notificationRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleProfileHover = () => {
    gsap.to(profileRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleProfileLeave = () => {
    gsap.to(profileRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 right-0 p-4 shadow-lg flex justify-between items-center border-b bg-slate-950 z-50"
      style={{
        left: isSidebarHovered ? '16rem' : '', // Align with Sidebar width
        width: `calc(100%)`, // Adjust width accordingly
        transition: 'left 0.3s ease, width 0.3s ease',
      }}
    >
      {/* Menu Icon */}
      <button
        onClick={() => dispatch(toggleSidebar())} // Correctly dispatch toggleSidebar
        onMouseEnter={() => setHoverMenu(true)}
        onMouseLeave={() => setHoverMenu(false)}
        className="text-white ml-1 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search mail"
        className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md w-1/3 shadow-sm transition-all duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <button
          ref={notificationRef}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
          onMouseEnter={handleNotificationHover}
          onMouseLeave={handleNotificationLeave}
        >
          🔔
        </button>
        <img
          ref={profileRef}
          src="https://via.placeholder.com/40"
          alt="User"
          className="rounded-full w-10 h-10 cursor-pointer transition duration-300"
          onMouseEnter={handleProfileHover}
          onMouseLeave={handleProfileLeave}
        />
      </div>
    </div>
  );
};

export default Navbar;
