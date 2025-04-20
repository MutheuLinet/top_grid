// app/context/ServiceContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type ServiceContextType = {
    service: string;
    message: string;
} | null;

type ServiceContextValue = {
    serviceRequest: ServiceContextType;
    setServiceRequest: (request: ServiceContextType) => void;
};

const ServiceContext = createContext<ServiceContextValue | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
    const [serviceRequest, setServiceRequest] = useState<ServiceContextType>(null);

    return (
        <ServiceContext.Provider value={{ serviceRequest, setServiceRequest }}>
            {children}
        </ServiceContext.Provider>
    );
}

export function useService() {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useService must be used within a ServiceProvider");
    }
    return context;
}