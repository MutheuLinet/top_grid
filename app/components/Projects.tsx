"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const projects = [
    { id: 1, src: "/projects/g1.jpeg", alt: "Project 1" },
    { id: 3, src: "/projects/g3.jpeg", alt: "Project 3" },
    { id: 2, src: "/projects/g2.jpeg", alt: "Project 2" },
    { id: 7, src: "/projects/g7.jpeg", alt: "Project 7" },
    { id: 8, src: "/projects/g8.jpeg", alt: "Project 8" },
    { id: 11, src: "/projects/g11.jpeg", alt: "Project 11" },
    { id: 12, src: "/projects/g12.jpeg", alt: "Project 12" },
    { id: 10, src: "/projects/g10.jpeg", alt: "Project 10" },
];

const Projects = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-4xl font-extrabold text-[#1d6042] leading-tight mb-6">Our Projects</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        layout
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(project.src)}
                        className="cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-[4/3]" // Set a uniform aspect ratio
                    >
                        <Image
                            src={project.src}
                            alt={project.alt}
                            width={300}
                            height={225} // Maintain 4:3 aspect ratio
                            className="object-cover w-full h-full"
                            priority
                        />
                    </motion.div>
                ))}
            </div>

            {/* Enlarged Image Modal with Blur Effect */}
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
    );
};

export default Projects;