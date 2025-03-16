import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
    onClick?: () => void;
    className?: string; // Add className to the props
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium block ${className || ''}`} // Merge default and custom classes
    >
        {children}
    </Link>
);