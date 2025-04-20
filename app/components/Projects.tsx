"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const projects = [
    { id: 1, src: "/projects/g1.jpeg", alt: "Project 1" },
    { id: 3, src: "/projects/g3.jpeg", alt: "Project 3" },
    { id: 2, src: "/projects/g2.jpeg", alt: "Project 2" },
    { id: 11, src: "/projects/g11.jpeg", alt: "Project 11" },
    { id: 12, src: "/projects/g12.jpeg", alt: "Project 12" },
    { id: 10, src: "/projects/g10.jpeg", alt: "Project 10" },
];

const Projects = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="w-full px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Heading with responsive sizing */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d6042] mb-2 md:mb-4 text-left"
                >
                    Our Projects
                </motion.h2>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 md:mb-12 text-left">
                    Explore our latest work driving impactful change
                </p>

                {/* Projects Grid - Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.03, zIndex: 10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedImage(project.src)}
                            className="cursor-pointer group relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
                        >
                            <Image
                                src={project.src}
                                alt={project.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority
                            />
                            {/* Hover overlay effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium text-lg">
                                    View Project
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
                                <Image
                                    src={selectedImage}
                                    alt="Selected Project"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                                >
                                    <X size={36} strokeWidth={2} /> {/* Close icon */}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;