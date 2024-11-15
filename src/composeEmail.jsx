// import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
function ComposeEmail({ onClose }) {
    const[composeCross,setcomposeCross] = useState(true);
    
    const handleComposeCrossClick = () => {
        setcomposeCross(!composeCross);
    }
    return (
        <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">New Message</h2>
                <button onClick={handleComposeCrossClick} className="text-gray-400 hover:text-gray-600">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <form className="p-4 space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="to">
                        To
                    </label>
                    <input
                        className="w-full p-2 mt-1 border rounded focus:ring-blue-500 focus:border-blue-500"
                        id="to"
                        type="text"
                        placeholder="Enter recipient"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        className="w-full p-2 mt-1 border rounded focus:ring-blue-500 focus:border-blue-500"
                        id="subject"
                        type="text"
                        placeholder="Enter subject"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium" htmlFor="body">
                        Message
                    </label>
                    <textarea
                        className="w-full p-2 mt-1 border rounded h-64 resize-none focus:ring-blue-500 focus:border-blue-500"
                        id="body"
                        placeholder="Write your message here..."
                    />
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                    <button
                        type="button"
                        onClick={handleComposeCrossClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                    <button
                        type="button"
                        onClick={handleComposeCrossClick}
                        className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ComposeEmail;
