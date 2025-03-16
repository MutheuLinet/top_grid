"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <section className="relative bg-white py-16">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-[#1d6042]">
                            Driving Sustainability Forward
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">
                                TOP GRID ECO SOLUTIONS
                            </span>{" "}
                            is a dynamic and progressive consultancy firm dedicated to
                            fostering a sustainable future through innovative solutions that
                            address the critical challenges of
                            <span className="text-[#1d6042] font-medium">
                                {" "}water scarcity, environmental degradation, and food security
                            </span>{" "}
                            for both private and public sector clients.
                        </p>
                        <p className="text-gray-700">
                            Our mission is to provide tailored eco-friendly strategies that
                            drive impact, efficiency, and resilience in today's evolving
                            environmental landscape.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={toggleDetails}
                                className="bg-[#1d6042] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0f3e2a] transition-all"
                            >
                                {showDetails ? "Show Less" : "Learn More"}
                            </button>
                            <a
                                href="#contact"
                                className="border-2 border-[#1d6042] text-[#1d6042] px-6 py-3 rounded-lg shadow-lg hover:bg-[#1d6042] hover:text-white transition-all"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <img
                            src="/sa.jpg"
                            alt="Sustainability"
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1d6042] via-transparent to-transparent opacity-30 rounded-lg"></div>
                    </div>
                </div>

                {/* Additional Details (Full Width) */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden mt-10 p-8 bg-gray-100 rounded-lg shadow-lg"
                        >
                            <div className="max-w-5xl mx-auto space-y-6">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Our team of skilled professionals, including
                                    environmental experts, hydrologists, and agronomists,
                                    bring a wealth of knowledge and experience to tackle
                                    the pressing challenges of our time.
                                </p>

                                <h3 className="text-2xl font-bold text-[#1d6042]">Our Mission</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Our mission is to deliver cutting-edge eco-friendly
                                    solutions that address the challenges of water
                                    scarcity, environmental degradation, and food
                                    security. Through our expertise and commitment to
                                    excellence, we aim to positively impact the
                                    environment by curbing climate change and creating
                                    a more sustainable future.
                                </p>

                                <h3 className="text-2xl font-bold text-[#1d6042]">Our Values</h3>
                                <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                                    <li><span className="font-semibold">Sustainability:</span> Committed to long-term eco-friendly solutions.</li>
                                    <li><span className="font-semibold">Stewardship:</span> Ensuring minimal environmental impact.</li>
                                    <li><span className="font-semibold">Innovation:</span> Developing cutting-edge technologies.</li>
                                    <li><span className="font-semibold">Collaboration:</span> Partnering with experts and organizations.</li>
                                    <li><span className="font-semibold">Integrity:</span> Upholding transparency and ethics.</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default About;
