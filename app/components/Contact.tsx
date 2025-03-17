"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; 

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors: typeof errors = {}; 
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Submitted", formData);
        }
    };

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white rounded-xl shadow-lg relative overflow-hidden border border-gray-100 flex"
            >
                {/* Illustration Section (Left Side) */}
                <div className="w-1/2 bg-green-50 flex items-center justify-center p-10">
                    <Image
                        src="/tel1.jpg"
                        alt="Zen Illustration"
                        width={800} 
                        height={600}
                        className="w-full h-auto max-w-md"
                    />
                </div>

                {/* Form Section (Right Side) */}
                <div className="w-1/2 p-10">
                    {/* Heading */}
                    <h2 className="text-4xl font-bold text-[#1d6042] mb-8">
                        Get in Touch
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50 h-32 resize-none"
                            ></textarea>
                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full  bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all font-medium"
                            aria-label="Send Message"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;