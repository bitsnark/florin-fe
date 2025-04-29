import { Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { EvmWalletConnect } from './evm-wallet-connector';
import logo from '@/assets/bos-bridge-logo.png';
import { MenuIcon } from './ui/menu-icon';
// Define the navigation items
const navigationItems = [
  {
    to: 'https://www.bitcoinos.build/',
    label: 'About BitcoinOS',
    external: true,
  },
  {
    to: 'https://whitepaper.bitcoinos.build/',
    label: 'Whitepaper',
    external: true,
  },
  {
    to: 'https://app-florin.netlify.app/',
    label: 'How it works',
    external: true,
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use effect to handle mounting state - this avoids animation on initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use effect to prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure we restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Reusable classes
  const linkClasses = {
    desktop: 'text-white [&.active]:font-bold',
    mobile:
      'text-white py-3 border-b border-grey opacity-0 transform translate-x-4 transition-all duration-300 ease-in-out',
    mobileActive:
      'text-white py-3 border-b border-grey opacity-100 transform translate-x-0 transition-all duration-300 ease-in-out',
  };

  // Handle menu toggle with animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Delay for staggered animation of menu items
  const getAnimationDelay = (index: number) => {
    return { transitionDelay: `${150 + index * 75}ms` };
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="w-full flex justify-center pb-8 hidden md:flex">
        <div className="p-2 flex gap-2 w-[1024px] h-[120px] justify-between pt-8">
          <div className="flex items-center gap-5">
            <img
              src={logo}
              alt="Grail Bridge Logo"
              className="w-[72px] h-[72px]"
            />
            <span className="text-white font-bold">Grail Bridge</span>
          </div>
          <div className="flex items-center gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${linkClasses.desktop} text-white`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <EvmWalletConnect />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full md:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">Grail Bridge</span>
          </div>
          <div className="flex items-center gap-3">
            <EvmWalletConnect />
            <MenuIcon isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <div
          className={`bg-[#1e1c21] fixed top-[100px] left-0 right-0 bottom-0 z-40 p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          } ${mounted ? 'visible' : 'invisible'}`}
        >
          {navigationItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-white ${
                isMenuOpen ? linkClasses.mobileActive : linkClasses.mobile
              }`}
              style={getAnimationDelay(index)}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div
            className={`mt-4 transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={getAnimationDelay(navigationItems.length)}
          ></div>
        </div>
      </div>
    </>
  );
}
