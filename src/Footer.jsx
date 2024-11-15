import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// import Inbox from './inbox';

const Footer = () => {
    return (
    
        <footer className="bg-gray-800 text-gray-200 py-6 fixed bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0   fixed  left-0 right-0 ">
                {/* Left Section - Links */}
                <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
                    <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
                    <a href="#" className="hover:text-blue-400 transition">Help</a>
                    <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
                </div>

                {/* Center Section - Social Media Icons */}
                <div className="flex space-x-4 text-lg">
                    <a href="#" className="hover:text-blue-400 transition"><FaFacebook /></a>
                    <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
                    <a href="#" className="hover:text-blue-400 transition"><FaLinkedin /></a>
                    <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
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
