// import React from 'react';
import { useSelector } from 'react-redux';
import emailData from '../src/email.json';

const Starred = () => {
    // console.log("running till here");
    
    const starredEmails = useSelector((state) => state.starred);

    // Filter the email data to only show starred emails
    const starredEmailData = emailData.filter((email) => starredEmails[email.emailId]);
    // console.log(starredEmailData);
    

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Starred Emails</h2>
            {starredEmailData.length > 0 ? (
                starredEmailData.map((email, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
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
                ))
            ) : (
                <p className="text-gray-500">No starred emails.</p>
            )}
        </div>
    );
};

export default Starred;
