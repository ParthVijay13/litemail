// src/components/Footer.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';

const Footer = () => {
  // Refs for GSAP animations
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const iconsRef = useRef([]);

  useEffect(() => {
    // Footer entrance animation: fade in and slide up
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Staggered animation for links
    gsap.to(linksRef.current, {
      opacity: 1,
      y: 20,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Staggered animation for icons
    gsap.to(iconsRef.current, {
      opacity: 1,
      y: 20,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.7,
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-800 text-gray-200 py-6 fixed bottom-0 left-0 right-0 "
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
        {/* Left Section - Internal Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
          <Link
            to="/privacy-policy"
            ref={(el) => (linksRef.current[0] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            ref={(el) => (linksRef.current[1] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Terms of Service"
          >
            Terms of Service
          </Link>
          <Link
            to="/help"
            ref={(el) => (linksRef.current[2] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Help"
          >
            Help
          </Link>
          <Link
            to="/contact-us"
            ref={(el) => (linksRef.current[3] = el)}
            className="hover:text-blue-400 text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </div>

        {/* Center Section - External Social Media Links */}
        <div className="flex space-x-6 text-lg 
         ">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[0] = el)}
            className="flex text-white items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded opacity-1 "
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
            className="flex text-white  items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded "
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
            className="flex items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
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
            className="flex items-center space-x-1 hover:text-blue-400 transition transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Instagram"
          >
            <FaInstagram />
            <span className="hidden md:inline text-white">Instagram</span>
          </a>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-center md:text-right text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Email App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
