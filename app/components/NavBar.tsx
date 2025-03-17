"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "./NavLink";
import Image from "next/image";

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll(); // Check on mount

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Top Contact Bar (Not Fixed, Scrolls Away) */}
            <div className="fixed top-0 left-0 w-full bg-[#134d35] text-white text-center p-2 z-50">
                Call Us: +254 719 695 270 | +254 735 112 889
            </div>

            {/* Navbar (Sticky After Scrolling) */}
            <header className={`fixed top-[40px] left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#f9f4f1] shadow-md" : "bg-transparent"}`}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Image
                                src="/eco_logo.png"
                                alt="TopGrid EcoSolution"
                                width={100} // Set the appropriate width
                                height={80} // Set the appropriate height
                                className="h-20"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <NavLink href="/" className={isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}>
                                Home
                            </NavLink>
                            <NavLink href="#about" className={isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}>
                                About
                            </NavLink>
                            <NavLink href="#services" className={isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}>
                                Services
                            </NavLink>
                            <NavLink href="#projects" className={isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}>
                                Projects
                            </NavLink>
                            <NavLink href="#contact" className={isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}>
                                Contact
                            </NavLink>
                            <Link
                                href="#contact"
                                className={`px-4 py-2 rounded-md transition-colors ${isScrolled ? "bg-[#134d35] text-white hover:bg-[#0f3e2a]" : "bg-white text-[#134d35] hover:bg-gray-100"}`}
                            >
                                Free Quote
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className={`p-2 rounded-md focus:outline-none ${isScrolled ? "text-gray-800 hover:text-[#134d35]" : "text-white hover:text-gray-200"}`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
                            <div className="px-4 pt-2 pb-3 space-y-2">
                                <NavLink href="/" onClick={toggleMenu} className="text-gray-800 hover:text-[#134d35]">
                                    Home
                                </NavLink>
                                <NavLink href="#about" onClick={toggleMenu} className="text-gray-800 hover:text-[#134d35]">
                                    About
                                </NavLink>
                                <NavLink href="#services" onClick={toggleMenu} className="text-gray-800 hover:text-[#134d35]">
                                    Services
                                </NavLink>
                                <NavLink href="#projects" onClick={toggleMenu} className="text-gray-800 hover:text-[#134d35]">
                                    Projects
                                </NavLink>
                                <NavLink href="#contact" onClick={toggleMenu} className="text-gray-800 hover:text-[#134d35]">
                                    Contact
                                </NavLink>
                                <Link
                                    href="#contact"
                                    className="block bg-[#134d35] text-white px-4 py-2 rounded-md text-center hover:bg-[#0f3e2a] transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Free Quote
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
};