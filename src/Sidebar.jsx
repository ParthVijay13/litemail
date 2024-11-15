import { useState } from 'react';
import { Transition } from '@headlessui/react';
import Starred from '../components/starred'; // Make sure the import is capitalized correctly
import { Link } from 'react-router-dom';
import ComposeEmail from './composeEmail';

function Sidebar({ isOpen, toggleSidebar }) {
    const [isMoreOpen, setMoreOpen] = useState(false);
    const [showStarred, setShowStarred] = useState(false); // State to manage Starred component visibility
    const [showCompose, setShowCompose] = useState(false);

    const handleCompose = () => {
        setShowCompose(true);
    };

    const handleClose = () => {
        setShowCompose(false);
    };

    const toggleMore = () => {
        setMoreOpen(!isMoreOpen);
    };

    const handleStarredClick = () => {
        setShowStarred(true); // Show the Starred component when clicked
    };

    return (
        <Transition
            show={isOpen}
            enter="transition transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 overflow-hidden z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 focus:outline-none"
                >
                    ✕ Close
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    type="button"
                    onClick={handleCompose}
                
                    
                >
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 4h16v16H4z"></path>
                        <path d="M4 10h16M8 4v8"></path>
                    </svg>
                    <span>Compose</span>
                    {showCompose}
                </button>

                <h2 className="mt-4 text-lg font-semibold">Menu</h2>
                <ul className="mt-4 space-y-2">
                    <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                        <button>Drafts</button>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                        <button onClick={handleStarredClick}><Link to="/starred">Starred</Link></button>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                        <button>Snoozed</button>
                    </li>
                    <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                        <button>Sent</button>
                    </li>
                    <li>
                        <button
                            onClick={toggleMore}
                            className="flex items-center justify-between w-full hover:bg-gray-100 p-2 rounded cursor-pointer focus:outline-none"
                        >
                            <span>More</span>
                            <span>{isMoreOpen ? '▲' : '▼'}</span>
                        </button>
                        {isMoreOpen && (
                            <ul className="pl-4 mt-2 space-y-1">
                                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Spam</li>
                                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Trash</li>
                                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Important</li>
                            </ul>
                        )}
                    </li>
                </ul>

                {/* Conditionally render the Starred component */}
                {showStarred && <Starred />}
            </div>
        </Transition>
    );
}

export default Sidebar;

