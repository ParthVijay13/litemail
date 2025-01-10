// src/components/Footer.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';

const Footer = ({ isSidebarHovered }) => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const iconsRef = useRef([]);

  // State to manage footer visibility based on scroll
  const [showFooter, setShowFooter] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) { // Threshold to show footer
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setShowFooter(true);
        } else {
          // Scrolling up
          setShowFooter(false);
        }
      } else {
        setShowFooter(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for performance
    const throttledHandleScroll = () => {
      if (scrollTimeout.current === null) {
        scrollTimeout.current = setTimeout(() => {
          handleScroll();
          scrollTimeout.current = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showFooter) {
      // Animate footer in
      gsap.to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Animate links and icons
      gsap.to(linksRef.current, {
        opacity: 1,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1,
      });

      gsap.to(iconsRef.current, {
        opacity: 1,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
      });
    } else {
      // Animate footer out
      gsap.to(footerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [showFooter]);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-800 text-gray-200 py-6 fixed bottom-0 overflow-hidden z-40"
      style={{
        left: isSidebarHovered ? '16rem' : '4rem', // Align with Sidebar
        right: 0,
        transform: 'translateY(50px)',
        opacity: 0,
        transition: 'left 0.3s ease',
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        {/* Internal Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
          <Link
            to="/privacy-policy"
            ref={(el) => (linksRef.current[0] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            ref={(el) => (linksRef.current[1] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Terms of Service"
          >
            Terms of Service
          </Link>
          <Link
            to="/help"
            ref={(el) => (linksRef.current[2] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Help"
          >
            Help
          </Link>
          <Link
            to="/contact-us"
            ref={(el) => (linksRef.current[3] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 text-lg">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[0] = el)}
            className="flex text-white items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Facebook"
          >
            <FaFacebook />
            <span className="hidden md:inline text-white">Facebook</span>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[1] = el)}
            className="flex text-white items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Twitter"
          >
            <FaTwitter />
            <span className="hidden md:inline text-white">Twitter</span>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[2] = el)}
            className="flex items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
            <span className="hidden md:inline text-white">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[3] = el)}
            className="flex items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-0"
            aria-label="Instagram"
          >
            <FaInstagram />
            <span className="hidden md:inline text-white">Instagram</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Email App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
