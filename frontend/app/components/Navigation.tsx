"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faArrowUp, faCog } from '@fortawesome/free-solid-svg-icons';
// import logo from "/logo.png";

const Navigation = () => {
    return (
        <div className="bg-[#C1BEAF] w-20 h-screen border-r border-r-[#262832] border-transparent flex flex-col relative">
            {/* Logo Container */}
            <div className="mb-4 flex justify-center mt-1">
            <div style={{ backgroundImage: 'url("lccb.png")', aspectRatio: "1/1", height: "100px", backgroundSize: "contain" }}>
            </div>
            </div>
            {/* Navigation Items */}
            <ul className="flex flex-col items-center mt-4 space-y-4">
                {[
                    { icon: faHome, label: "Home" },
                    { icon: faTh, label: "Categories" },
                    { icon: faArrowUp, label: "Updates" },
                    { icon: faCog, label: "Settings" } // New settings item added here
                ].map((item, index) => (
                    <li key={index} className="relative">
                        <div className="w-14 h-14 bg-[#262832] rounded-lg flex items-center justify-center transition-colors duration-300 hover:bg-blue-500 hover:cursor-pointer">
                            <FontAwesomeIcon icon={item.icon} className="text-white" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navigation;
