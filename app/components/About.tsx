"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <section className="relative bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-1 md:order-none space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1d6042]">
                            Driving Sustainability Forward
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
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

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <motion.p
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <button
                                    onClick={toggleDetails}
                                    className="w-full flex items-center justify-center gap-2 bg-[#1d6042] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#0f3e2a] transition-all"
                                >
                                    {showDetails ? (
                                        <>
                                            <span>Show Less</span>
                                            <ChevronUp size={20} />
                                        </>
                                    ) : (
                                        <>
                                            <span>Learn More</span>
                                            <ChevronDown size={20} />
                                        </>
                                    )}
                                </button>
                            </motion.p>

                            <a
                                href="#contact"
                                className="text-center border-2 border-[#1d6042] text-[#1d6042] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#1d6042] hover:text-white transition-all"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>

                    {/* Image with cut-out effect */}
                    <div className="order-0 md:order-none relative h-[350px] md:h-[500px] w-full">
                        <div className="absolute inset-0 overflow-hidden">
                            <Image
                                src="/Kobuin_community.jpg"
                                alt="Sustainability"
                                fill
                                className="object-cover shadow-xl"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 60% 100%, 0 70%)'
                                }}
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[#1d6042] via-transparent to-transparent opacity-30"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 70% 100%, 0 80%)'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden mt-6 md:mt-10 p-6 md:p-8 bg-gray-50 rounded-lg shadow-inner border border-gray-200"
                        >
                            <div className="max-w-5xl mx-auto space-y-6">


                                <h3 className="text-xl sm:text-2xl font-bold text-[#1d6042]">Our Mission</h3>
                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    Our mission is to deliver cutting-edge eco-friendly
                                    solutions that address the challenges of water
                                    scarcity, environmental degradation, and food
                                    security. Through our expertise and commitment to
                                    excellence, we aim to positively impact the
                                    environment by curbing climate change and creating
                                    a more sustainable future.
                                </p>

                                <h3 className="text-xl sm:text-2xl font-bold text-[#1d6042]">Our Vision</h3>
                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    To be a global leader in providing innovative and sustainable solutions where clean water, healthy environments, and thriving agriculture are accessible to all.
                                </p>

                                <h3 className="text-xl sm:text-2xl font-bold text-[#1d6042]">Our Values</h3>
                                <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 leading-relaxed space-y-2">
                                    <li><span className="font-semibold">Sustainability:</span> Committed to long-term eco-friendly solutions.</li>
                                    <li><span className="font-semibold">Stewardship:</span> Ensuring minimal environmental impact.</li>
                                    <li><span className="font-semibold">Innovation:</span> Developing cutting-edge technologies.</li>
                                    <li><span className="font-semibold">Collaboration:</span> Partnering with experts and organizations.</li>
                                    <li><span className="font-semibold">Integrity:</span> Upholding transparency and ethics.</li>
                                </ul>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#1d6042]">Our Team</h3>

                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    We are a multidisciplinary team of passionate professionals: environmental experts, hydrologists, agronomists, and climate specialists dedicated to building a more sustainable and resilient future.
                                    <br /><br />
                                    With a wealth of experience across water, environment, agriculture, and climate adaptability, we bring integrated solutions to complex challenges. Our strength lies not only in our technical expertise but also in our collaborative approach—working alongside communities, businesses, and governments to create impact that lasts.
                                    <br /><br />
                                    Together, we believe in shaping a world where people and nature coexist in harmony, now and for future generations.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default About;