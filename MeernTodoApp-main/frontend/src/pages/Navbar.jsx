import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-200 text-black w-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    <div className="flex items-center">
                        <a href="/" className="text-3xl font-bold font-sans">
                            Todo
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-9">
                        <a href="#" className="hover:text-gray-700">
                            Home
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            About
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            Services
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            Contact
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md">
                            Home
                        </a>
                        <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md">
                            About
                        </a>
                        <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md">
                            Services
                        </a>
                        <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md">
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
