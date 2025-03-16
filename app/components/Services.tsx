"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
    {
        title: "Water Scarcity Solutions",
        description:
            "We specialize in sustainable water management strategies to combat water scarcity effectively.",
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
        icon: "/services/s1.jpg",
    },
    {
        title: "Environmental Degradation Solutions",
        description:
            "We offer comprehensive environmental management plans to mitigate and reverse degradation.",
        details: [
            "Environmental Impact Assessment (EIA)",
            "Environmental Audit",
            "Strategic Planning",
        ],
        icon: "/services/s2.jpg",
    },
    {
        title: "Sustainable Agriculture",
        description:
            "We implement strategies to enhance food security and promote sustainable agricultural practices.",
        details: [],
        icon: "/services/s3.jpg",
    },
    {
        title: "Capacity Building & Advisory",
        description:
            "We empower individuals and organizations with skills and resources for environmental sustainability.",
        details: [],
        icon: "/services/s1.jpg",
    },
    {
        title: "Public Sector Consultancy",
        description:
            "We provide expert consultancy for sustainable land management and environmental conservation.",
        details: [],
        icon: "/services/s2.jpg",
    },
];

const Services = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: number) => {
        if (scrollRef.current) {
            // Scroll by the width of one card (600px in this case)
            scrollRef.current.scrollBy({ left: direction * 600, behavior: "smooth" });
        }
    };

    return (
        <section className="relative bg-[#f9f4f1] py-8 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-[#1d6042]">Our Services</h2>
            </div>

            <div className="relative mt-10 mb-8">
                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-6 scrollbar-hide px-12 thin-scrollbar snap-x snap-mandatory"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="min-w-[700px] bg-white border border-gray-200 rounded-xl flex transition-all duration-300 mb-4 snap-center p-6"
                        >

                            {/* Image Section */}
                            <div className="w-1/2 relative">
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="w-full h-full object-cover rounded-l-lg"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="w-1/2 p-6 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-[#1d6042]">{service.title}</h3>
                                <p className="text-lg text-gray-700 leading-relaxed mt-2">{service.description}</p>
                                {service.details.length > 0 && (
                                    <ul className="text-gray-600 text-sm mt-3 text-left list-disc list-inside">
                                        {service.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Buttons - Stacked on the Right */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-10">
                    <button
                        className="bg-white p-3 shadow-lg hover:bg-gray-200 transition duration-300 rounded-lg"
                        onClick={() => scroll(-1)}
                    >
                        <ChevronLeft className="h-6 w-6 text-[#1d6042]" />
                    </button>
                    <button
                        className="bg-white p-3 shadow-lg hover:bg-gray-200 transition duration-300 rounded-lg"
                        onClick={() => scroll(1)}
                    >
                        <ChevronRight className="h-6 w-6 text-[#1d6042]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;