import React, { useState } from "react";
import SearchBooks from "./searchBooks";
import Collection from "./collection";
import GetRecommendations from "./getRecommendations";

const Layout: React.FC = () => {
    const [showSearchBooks, setShowSearchBooks] = useState(false);
    const toggleView = () => {
        setShowSearchBooks(prevState => !prevState);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex flex-col flex-grow p-2 overflow-auto">
                <button 
                    onClick={toggleView}
                    className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-95"
                >
                    {showSearchBooks ? "Show Collection" : "Show Search Books"}
                </button>
                <div className="mt-2 flex-grow overflow-auto">
                    {showSearchBooks ? <SearchBooks /> : <Collection />}
                </div>
            </div>
            <div className="md:w-1/4 w-full md:flex-shrink-0 h-full overflow-auto">
                <GetRecommendations />
            </div>
        </div>
    );
};

export default Layout;
