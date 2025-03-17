"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative -mt-6 w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: "url('/bg.jpg')" }}>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl px-6">
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold tracking-wide"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    TOP GRID ECO SOLUTIONS
                </motion.h1>

                <motion.p
                    className="mt-4 text-lg md:text-xl text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    &quot;Paving the way to a greener tomorrow&quot;
                </motion.p>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8"
                >
                    <Link href="#services" className="px-6 py-3 bg-green-500 hover:bg-green-600 transition-all text-white text-lg font-medium rounded-lg shadow-lg">
                        Explore Our Services
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};