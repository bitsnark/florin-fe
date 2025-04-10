import { Link } from '@tanstack/react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link
              to="/"
              className="text-white [&.active]:font-bold"
              style={{ color: 'white' }}
            >
              About BitcoinOS
            </Link>
            <Link
              to="/history"
              className="text-white [&.active]:font-bold"
              style={{ color: 'white' }}
            >
              Grail Bridge
            </Link>
            <Link
              to="/design-system"
              className="text-white [&.active]:font-bold"
              style={{ color: 'white' }}
            >
              Whitepaper
            </Link>
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
          <button
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-[#1e1c21] absolute top-[72px] left-0 w-full z-50 p-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-white py-3 border-b border-grey"
              style={{ color: 'white' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About BitcoinOS
            </Link>
            <Link
              to="/history"
              className="text-white py-3 border-b border-grey"
              style={{ color: 'white' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Grail Bridge
            </Link>
            <Link
              to="/design-system"
              className="text-white py-3 border-b border-grey"
              style={{ color: 'white' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Whitepaper
            </Link>
            <div className="mt-4">
              <Button variant="orange" className="w-full py-4 rounded-lg">
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
