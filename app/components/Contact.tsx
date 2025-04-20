"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useService } from "../context/ServiceContext";

const Contact = () => {
    const { serviceRequest, setServiceRequest } = useService();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        service: ""
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        // Check for service request from context first
        if (serviceRequest) {
            setFormData(prev => ({
                ...prev,
                service: serviceRequest.service,
                message: serviceRequest.message
            }));
            return;
        }

        // Fallback to localStorage for page refresh cases
        const storedRequest = localStorage.getItem('requestedService');
        if (storedRequest) {
            const { service, message } = JSON.parse(storedRequest);
            setFormData(prev => ({
                ...prev,
                service,
                message
            }));
            localStorage.removeItem('requestedService');
        }
    }, [serviceRequest]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Log the form data instead of sending to API
            console.log('Form submission data:', formData);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", message: "", service: "" });
            setServiceRequest(null); // Clear the service request after submission

            console.log('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <section id="contact" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center"
                >
                    <div className="mb-6 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1d6042] mb-4">
                        Thank You!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your message has been sent successfully. We will get back to you soon.
                    </p>
                    <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2 bg-[#1d6042] text-white rounded-lg hover:bg-[#134d35] transition-colors"
                    >
                        Send Another Message
                    </button>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="contact" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl w-full bg-white rounded-xl shadow-lg relative overflow-hidden border border-gray-100 flex flex-col lg:flex-row"
            >
                {/* Illustration Section */}
                <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto relative overflow-hidden">
                    <Image
                        src="/green_leaf.jpg"
                        alt="Plant Illustration"
                        fill
                        className="object-cover object-left"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 bg-[#FEFFFF]">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1d6042] mb-6 md:mb-8">
                        {formData.service ? `Request ${formData.service}` : "Get in Touch"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Hidden service field */}
                        {formData.service && (
                            <input type="hidden" name="service" value={formData.service} />
                        )}

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50 text-sm sm:text-base"
                                required
                            />
                            {errors.name && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50 text-sm sm:text-base"
                                required
                            />
                            {errors.email && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder={formData.service ? "" : "How can we help you?"}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all bg-gray-50 h-24 sm:h-32 resize-none text-sm sm:text-base"
                                required
                            />
                            {errors.message && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg transition-all font-medium text-sm sm:text-base`}
                            aria-label={isSubmitting ? "Submitting..." : "Send Message"}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                formData.service ? "Request Service" : "Send Message"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;