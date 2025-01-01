import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { toggleStarred } from '../slices/Starredslice';
import emailData from './email.json';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const Inbox = () => {
    const dispatch = useDispatch();
    const starredEmails = useSelector((state) => state.starred);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    // const [starredEmails, setStarredEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    

    // Toggle star status
    // const toggleStarred = (emailId) => {
    //     setStarredEmails((prevStarred) => ({
    //         ...prevStarred,
    //         [emailId]: !prevStarred[emailId],
    //     }));
    // };


    return (
        <div className="p-4">
           <Navbar toggleSidebar= {toggleSidebar}  searchTerm = {searchTerm} setSearchTerm= {setSearchTerm} />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
            <h2 className="text-lg font-semibold mb-4">Inbox</h2>
            {emailData
                .filter((email) => {
                    const subject = email.subject ? email.subject.toLowerCase() : '';
                    const emailId = email.emailId ? email.emailId.toLowerCase() : '';
                    const term = searchTerm.toLowerCase();
                    return subject.includes(term) || emailId.includes(term);
                }).map((email, index) => (
                <div
                    key={index}  
                    className={`flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${isSidebarOpen ? 'transform translate-x-64 transition-transform' : ''}`}
                >
                    
                    {/* Checkbox */}
                    <input type="checkbox" className="mr-4" />

                    {/* Star Icon */}
                    <div
                        onClick={() => dispatch(toggleStarred(email.emailId))}
                        className="mr-4 cursor-pointer"
                    >
                        {starredEmails[email.emailId] ? (
                            <FaStar className="text-yellow-500" />
                        ) : (
                            <FaRegStar className="text-gray-400" />
                        )}
                    </div>

                    {/* Sender */}
                    <div className="w-1/4 font-semibold text-gray-800">
                        {email.emailId}
                    </div>

                    {/* Subject */}
                    <div className="w-1/4 text-gray-600">
                        {email.subject}
                    </div>

                    {/* Body Preview */}
                    <div className="w-1/2 text-gray-500 truncate">
                        {email.body}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Inbox;