import { Link } from '@tanstack/react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Icon } from './ui/icon';
import { ICON_PATHS } from './ui/icons';

// Define the navigation items
const navigationItems = [
  { to: '/', label: 'About BitcoinOS' },
  { to: '/history', label: 'Grail Bridge' },
  { to: '/design-system', label: 'Whitepaper' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use effect to handle mounting state - this avoids animation on initial render
  useEffect(() => {
    setMounted(true);
  }, []);

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
              src="/src/assets/bos-bridge-logo.png"
              alt="Grail Bridge Logo"
              style={{
                width: 72,
                height: 72,
              }}
            />
            <span className="text-white font-bold">Grail Bridge</span>
          </div>
          <div className="flex items-center gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={linkClasses.desktop}
                style={{ color: 'white' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <Card className="flex flex-row items-center justify-center bg-grey w-[265px] h-[88px] rounded-xl pt-2 pr-2 pb-2 pl-10 border-none">
              <span className="text-white font-bold">Connect Wallet</span>
              <Button
                variant="orange"
                size="icon"
                style={{ fontSize: '25px', height: '72px', width: '72px' }}
              >
                {'->'}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full md:hidden">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/bos-bridge-logo.png"
              alt="Grail Bridge Logo"
              style={{
                width: 40,
                height: 40,
              }}
            />
            <span className="text-white font-bold text-sm">Grail Bridge</span>
          </div>
          <button className="text-white p-2 z-50 relative" onClick={toggleMenu}>
            {isMenuOpen ? (
              <Icon
                path={ICON_PATHS.CLOSE}
                stroke="white"
                width={24}
                height={24}
                className="transition-transform duration-300 rotate-90 scale-110"
              />
            ) : (
              <Icon
                path={ICON_PATHS.MENU}
                stroke="white"
                width={24}
                height={24}
                className="transition-transform duration-300 rotate-0"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <div
          className={`bg-[#1e1c21] fixed top-[72px] left-0 right-0 bottom-0 z-40 p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          } ${mounted ? 'visible' : 'invisible'}`}
        >
          {navigationItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: 'white',
                ...getAnimationDelay(index),
              }}
              className={
                isMenuOpen ? linkClasses.mobileActive : linkClasses.mobile
              }
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
          >
            <Button variant="orange" className="w-full py-4 rounded-lg">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
