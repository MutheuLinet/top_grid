"use client";
import { useState, useRef, useEffect } from "react";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "../context/ServiceContext";

interface Service {
    title: string;
    description: string;
    icon: string;
    details: string[];
    fullDescription: string;
    benefits: string[];
    color: string;
    textColor: string;
}

const services: Service[] = [
    {
        title: "Environmental Degradation Solutions",
        description: "We offer comprehensive environmental management plans to mitigate and reverse degradation.",
        icon: "/services/environment_degradation.jpg",
        details: [
            "Environmental Impact Assessment (EIA)",
            "Environmental Audit",
            "Strategic Planning",
        ],
        fullDescription: "We help organizations minimize their environmental footprint while meeting regulatory requirements through comprehensive assessment and planning services.",
        benefits: [
            "Regulatory compliance",
            "Risk mitigation",
            "Improved sustainability metrics",
            "Stakeholder confidence"
        ],
        color: "bg-green-50",
        textColor: "text-green-600"
    },
    {
        title: "Water Scarcity Solutions",
        description: "We specialize in sustainable water management strategies to combat water scarcity effectively.",
        icon: "/services/water_scarcity.jpg",
        details: [
            "Hydrogeological and hydrological survey",
            "Borehole drilling & equipping",
            "Pump testing",
            "Borehole camera inspection",
            "Pump installation",
            "Tank installation",
            "Water supply survey, design, and installation",
            "Water treatment – Domestic, Agricultural, Industrial",
        ],
        fullDescription: "Our comprehensive water solutions address scarcity through innovative technologies and sustainable practices. We provide end-to-end services from assessment to implementation.",
        benefits: [
            "Increased water security",
            "Reduced environmental impact",
            "Cost-effective solutions",
            "Long-term sustainability"
        ],
        color: "bg-blue-50",
        textColor: "text-blue-600"
    },
    {
        title: "Sustainable Agriculture",
        description: "We implement strategies to enhance food security and promote sustainable agricultural practices.",
        icon: "/services/sustainable_agriculture.avif",
        details: [
            "Precision farming systems",
            "Soil health management",
            "Water-efficient irrigation",
        ],
        fullDescription: "Our agricultural solutions combine traditional knowledge with modern technology to create productive, sustainable farming systems.",
        benefits: [
            "Higher yields with fewer inputs",
            "Improved soil health",
            "Water conservation",
            "Climate resilience"
        ],
        color: "bg-amber-50",
        textColor: "text-amber-600"
    },
    {
        title: "Capacity Building & Advisory",
        description: "We empower individuals and organizations with skills and resources for environmental sustainability.",
        icon: "/services/capacity_building.jpg",
        details: [
            "Workshops & seminars",
            "Technical training",
            "Policy development",
        ],
        fullDescription: "We empower organizations and communities with the knowledge and skills needed to implement sustainable practices.",
        benefits: [
            "Enhanced technical skills",
            "Improved decision-making",
            "Organizational capacity building",
            "Long-term self-sufficiency"
        ],
        color: "bg-purple-50",
        textColor: "text-purple-600"
    },
    {
        title: "Public Sector Consultancy",
        description: "We provide expert consultancy for sustainable land management and environmental conservation.",
        icon: "/services/public_sector_consultancy.jpg",
        details: [
            "Policy advisory services",
            "Regulatory compliance consulting",
            "Sustainable development planning"
        ],
        fullDescription: "Our expert consultants work with government agencies to develop and implement sustainable environmental policies and land management strategies.",
        benefits: [
            "Evidence-based policymaking",
            "Regulatory alignment",
            "Sustainable development goals implementation",
            "Public-private partnership facilitation"
        ],
        color: "bg-indigo-50",
        textColor: "text-indigo-600"
    },
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const { setServiceRequest } = useService();

    const handleRequestService = (serviceTitle: string) => {
        const defaultMessage = `Hello, I'm interested in your ${serviceTitle} service. Could you please provide more information?`;
        setServiceRequest({ service: serviceTitle, message: defaultMessage });
        closeModal();
        window.location.href = "/#contact";
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
    };

    const openModal = (index: number) => {
        setIsModalOpen(true);
        setSelectedService(index);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    useEffect(() => {
        if (!isModalOpen) {
            const interval = setInterval(() => nextSlide(), 6000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isModalOpen]);

    return (
        <section className="min-h-[90vh] py-8 bg-[#f7f8f9] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
                <div className="text-center mb-2 md:mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1d6042] mb-2">Our Services</h2>
                    <p className="mb-8 text-base md:text-lg text-gray-700">Tailored solutions for your sustainability challenges</p>
                </div>

                <div className="relative h-[80vh] w-full">
                    {/* Dynamic background that changes with slide */}
                    <div className={`absolute inset-0 ${services[currentIndex].color} transition-colors duration-700 -z-10`} />

                    {/* Container with peeking slides */}
                    <div className="relative h-full mx-8 sm:mx-12">
                        <div
                            ref={carouselRef}
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(calc(-${currentIndex * 100}% + ${currentIndex === 0 ? '8px' : currentIndex === services.length - 1 ? '-8px' : '0px'}))` }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {services.map((service, index) => (
                                <div
                                    key={index}

                                    className={`flex-shrink-0 w-[calc(100%-16px)] mx-2 transition-all duration-300 ${index === currentIndex ? 'scale-100' : 'scale-90 opacity-90'}`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full h-full shadow-xl overflow-hidden flex flex-col transition-all duration-300 group cursor-pointer"
                                        onClick={() => openModal(index)}
                                    >
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={service.icon}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority={index === currentIndex}
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                                <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(index);
                                                }}
                                                className="absolute top-4 right-4 z-10 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 text-[#1d6042] text-xs sm:text-sm font-medium rounded-lg hover:bg-white transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#1d6042]" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#1d6042]" />
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center mt-4 sm:mt-8 space-x-2">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-[#1d6042] scale-125" : "bg-gray-300"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>


                <AnimatePresence>
                    {selectedService !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                            >
                                {/* Improved close button positioning */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-50"
                                    aria-label="Close modal"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>

                                <div className="grid md:grid-cols-2">
                                    <div className="relative h-64 md:h-auto min-h-[300px]">
                                        <Image
                                            src={services[selectedService].icon}
                                            alt={services[selectedService].title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 md:p-8">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            {services[selectedService].title}
                                        </h3>
                                        <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base">
                                            {services[selectedService].fullDescription}
                                        </p>
                                        <div className="mt-4 sm:mt-6">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                                                Service Details:
                                            </h4>
                                            <ul className="space-y-1 sm:space-y-2">
                                                {services[selectedService].details.map((detail, i) => (
                                                    <li key={i} className="text-xs sm:text-sm text-gray-700 flex items-start">
                                                        <Plus size={14} className={`mt-1 mr-2 ${services[selectedService].textColor}`} />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 sm:mt-6">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                                                Benefits:
                                            </h4>
                                            <ul className="space-y-1 sm:space-y-2">
                                                {services[selectedService].benefits.map((benefit, i) => (
                                                    <li key={i} className="text-xs sm:text-sm text-gray-700 flex items-start">
                                                        <Plus size={14} className="mt-1 mr-2 text-green-600" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 sm:mt-6">
                                            <button
                                                onClick={() => handleRequestService(services[selectedService].title)}
                                                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-[#1d6042] text-white rounded-lg hover:bg-[#134d35] text-sm sm:text-base"
                                            >
                                                Request This Service
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}