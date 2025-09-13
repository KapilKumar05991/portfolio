import { Contact, HardHat, Phone, Swords } from 'lucide-react';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const NAV_LINKS = [
    { icon: <Contact />, label: 'About', href: '#about' },
    { icon: <Swords />, label: 'Skills', href: '#skills' },
    { icon: <HardHat />, label: 'Projects', href: '#projects' },
    { icon: <Phone />, label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="glass backdrop-blur-3xl max-w-7xl sticky top-2 m-2 sm:mx-auto sm:w-full z-40">
            <div className="mx-auto flex items-center justify-between px-3 lg:px-6 py-3">
                <div className="text-2xl font-bold text-blue-400 tracking-widest"><a href='#hero' className='hidden sm:inline'>KapilKumar</a><a href='#hero' className='sm:hidden'>KK</a></div>
                {/* Desktop links */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex gap-6 text-lg font-medium items-center">
                        {NAV_LINKS.map(link => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="px-2 py-1 inline-flex gap-1 items-center justify-center transition-colors duration-200 hover:text-blue-400"
                                >   {link.icon}
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Theme (right side) */}
                <div>
                    <ThemeSwitcher />
                </div>
                {/* Hamburger icon for mobile/tablet */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
                    onClick={() => setMenuOpen(m => !m)}
                >
                    <span className={`block w-7 h-0.75 rounded-2xl bg-blue-400 mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-7 h-0.75 rounded-2xl bg-blue-400 mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-7 h-0.75 rounded-2xl bg-blue-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>
            {/* Mobile menu dropdown */}
            <div
                className={`lg:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'min-h-[400px] py-2' : 'max-h-0 py-0'}`}
            >
                <ul className="h-[400px] flex flex-col justify-evenly items-center gap-4 text-2xl font-medium">
                    {NAV_LINKS.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="relative flex items-center justify-center gap-2 px-2 py-1 transition-colors duration-200 hover:text-blue-400"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.icon}
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
} 