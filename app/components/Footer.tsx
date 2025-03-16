"use client";

import Link from "next/link";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show/hide the arrow button based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Handle hash-based navigation
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const section = document.querySelector(hash);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        // Handle initial load with hash
        handleHashChange();

        // Handle hash changes during navigation
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <footer className="bg-[#1d6042] text-white py-8 relative">
            <div className="max-w-4xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Our Contacts</h3>
                        <p className="text-sm flex flex-col items-center md:items-start">
                            <span className="flex items-center gap-2">
                                <Phone size={16} /> +254 719 695 270
                            </span>
                            <span>+254 735 112 889</span>
                        </p>
                        <p className="text-sm flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} />
                            <a href="mailto:info@topgridecosolutions.com" className="hover:underline">
                                info@topgridecosolutions.com
                            </a>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-1 text-sm">
                            {["Home", "About", "Services", "Contact", "Projects"].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                                        className="hover:underline"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Business Hours</h3>
                        <p className="text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-6 pt-4 border-t border-green-400 text-center text-xs">
                    © {new Date().getFullYear()} TopGrid EcoSolutions. All rights reserved.
                </div>
            </div>

            {/* Floating Arrow Up Button */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-[#134d35] text-white rounded-full shadow-lg hover:bg-[#0f3e2a] transition-all duration-300 z-[1000]"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </footer>
    );
};