import  { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const Navbar = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
  const navRef = useRef(null);
  const menuIconRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [hoverMenu, setHoverMenu] = useState(false);

  useEffect(() => {
    // Fade in the navbar on page load
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", borderRadius:"10px"}
    );

    // Add hover effect for the menu icon
    gsap.to(menuIconRef.current, {
      scale: hoverMenu ? 1.2 : 1,
      rotate: hoverMenu ? 90 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [hoverMenu]);

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
      className="bg-white p-4 shadow-lg flex justify-between items-center border-b"
    >
      {/* Menu Icon */}
      <div
        className="relative group inline-block"
        // onMouseEnter={() => setHoverMenu(true)}
        onMouseLeave={() => setHoverMenu(false)}
      >
        <div
          ref={menuIconRef}
          className="p-2 rounded-full group-hover:bg-gray-300 transition duration-200 cursor-pointer"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Menu
        </span>
      </div>

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
