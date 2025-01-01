// src/components/Sidebar.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Starred from '../components/Starred';
import ComposeEmail from './ComposeEmail';

function Sidebar({ isOpen, toggleSidebar }) {
  const [isMoreOpen, setMoreOpen] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showCompose, setShowCompose] = useState(false);


  // Refs for GSAP animations
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const composeButtonRef = useRef(null);
  //   const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close the sidebar
      }
    };

    // Attach the click listener when the sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener on component unmount or when sidebar closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

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

  // Clear menu items refs on each render
  menuItemsRef.current = [];

  const addToMenuItemsRef = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  // ======== GSAP Animations ========

  // Animate sidebar and overlay in/out on isOpen change
  useEffect(() => {
    if (isOpen) {
      // Show overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 1, // toggles opacity and visibility
        duration: 0.4,
        ease: 'power2.out',
      });

      // Slide in the sidebar
      gsap.fromTo(
        sidebarRef.current,
        { x: '-80%', autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          onStart: () => {
            document.body.style.overflow = 'hidden'; // Disable body scroll
          },
          onComplete: () => {
            // Stagger menu items
            gsap.to(menuItemsRef.current, {
              opacity: 1,
              x: -20,
              stagger: 0.1,
              duration: 0.3,
              ease: 'power3.out',
              paddingLeft: '2rem',
            });

            // Subtle scale for compose button
            gsap.fromTo(
              composeButtonRef.current,
              { scale: 0.6 },
              {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
              }
            );
          },
        }
      );
    } else {
      // Slide out the sidebar
      gsap.to(sidebarRef.current, {
        x: '-70%',
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          document.body.style.overflow = 'auto'; // Re-enable body scroll
        },
      });

      // Fade out overlay
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      // Kill any ongoing tweens related to sidebar
      //   gsap.killTweensOf(sidebarRef.current);
      //   gsap.killTweensOf(composeButtonRef.current);
    }
  }, [isOpen]);

  // Menu Items Hover Animation
  useEffect(() => {
    if (isOpen) {
      // Hover handlers
      const handleMouseEnter = (item) => {
        gsap.to(item, {
          scale: 1.03,
          backgroundColor: '#f3f4f6',
          duration: 0.3,
          ease: 'power1.out',
        });
      };
      const handleMouseLeave = (item) => {
        gsap.to(item, {
          scale: 1,
          backgroundColor: '#ffffff',
          duration: 0.3,
          ease: 'power1.out',
        });
      };

      // Attach event listeners
      menuItemsRef.current.forEach((item) => {
        item.addEventListener('mouseenter', () => handleMouseEnter(item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      });

      // Cleanup on unmount or when isOpen changes
      return () => {
        menuItemsRef.current.forEach((item) => {
          item.removeEventListener('mouseenter', () => handleMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleMouseLeave(item));
        });
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay (dim background)
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none opacity-0"
      ></div> */}

      {/* Sidebar */}
      
      <div
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl p-4 transform -translate-x-full opacity-0 z-50 overflow-y-auto flex flex-col "
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Menu</h2>
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Compose Button */}
        <button
          ref={composeButtonRef}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mb-6"
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
          <Link to={"/inbox/#?"}>Compose</Link>
        </button>

        {/* Menu Items */}
        <ul className="space-y-2">
          <li
            ref={addToMenuItemsRef}
            className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
          >

            <span className="material-symbols-outlined">
              <Link to="/draft" className="block">
              drafts
              </Link>
              
            </span>
          </li>
          <li
            ref={addToMenuItemsRef}
            className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
          >
            <Link to="/starred" onClick={handleStarredClick} className="block">
              Starred
            </Link>
          </li>
          <li
            ref={addToMenuItemsRef}
            className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
          >
            <button className="w-full text-left">Snoozed</button>
          </li>
          <li
            ref={addToMenuItemsRef}
            className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
          >
            <button className="w-full text-left">Sent</button>
          </li>
          <li>
            <button
              onClick={toggleMore}
              className="flex items-center justify-between w-full hover:bg-gray-100 p-2 rounded cursor-pointer focus:outline-none transition-all duration-200"
            >
              <span>More</span>
              <span>{isMoreOpen ? '▲' : '▼'}</span>
            </button>
            {isMoreOpen && (
              <ul className="pl-4 mt-2 space-y-1">
                <li
                  ref={addToMenuItemsRef}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
                >
                  Spam
                </li>
                <li
                  ref={addToMenuItemsRef}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
                >
                  Trash
                </li>
                <li
                  ref={addToMenuItemsRef}
                  className="hover:bg-gray-100 p-2 rounded cursor-pointer transition-all duration-200"
                >
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
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
              <ComposeEmail onClose={handleCloseCompose} toggle={toggleSidebar} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
