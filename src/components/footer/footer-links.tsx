import { Link } from '@tanstack/react-router';

export function FooterLinks() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 pt-8 pb-5 md:pb-0 md:pt-0">
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px]"
          style={{
            fontFamily: 'Druk, sans-setif',
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '1%',
          }}
        >
          LEGAL
        </span>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Terms
        </Link>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px]"
          style={{
            fontFamily: 'Druk, sans-setif',
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '1%',
          }}
        >
          COMPANY
        </span>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          About
        </Link>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Whitepaper
        </Link>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Tech
        </Link>
      </div>
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px]"
          style={{
            fontFamily: 'Druk, sans-setif',
            fontWeight: 'bold',
            lineHeight: '120%',
            letterSpacing: '1%',
          }}
        >
          CONTACT
        </span>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Telegram
        </Link>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          X
        </Link>
        <Link
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'white',
          }}
          className="md:text-[#939097]"
          to="/"
        >
          Discord
        </Link>
      </div>
    </div>
  );
}
