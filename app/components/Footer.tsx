"use client";
import Link from "next/link";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return (
        <footer className="bg-[#1d6042] text-white py-8 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {/* Contact Info */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Our Contacts</h3>
                        <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                                <Phone size={16} /> +254 719 695 270
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone size={16} /> +254 735 112 889
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:info@topgridecosolutions.com" className="hover:underline">
                                    info@topgridecosolutions.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {["Home", "About", "Services", "Contact", "Projects"].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                                        className="hover:underline flex items-center gap-1"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Business Hours</h3>
                        <p className="text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                        <p className="text-sm">Sat: 9:00 AM - 1:00 PM</p>
                        <p className="text-sm">Sun: Closed</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 pt-6 border-t border-green-400 text-center text-xs">
                    © {new Date().getFullYear()} TopGrid EcoSolutions. All rights reserved.
                </div>
            </div>

            {/* Floating Arrow Up Button */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-2 sm:p-3 bg-[#134d35] text-white rounded-full shadow-lg hover:bg-[#0f3e2a] transition-all duration-300 z-50"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
            )}
        </footer>
    );
};