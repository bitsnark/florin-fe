import { Link } from '@tanstack/react-router';

export function FooterLinks() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 pt-8 pb-5 md:pb-0 md:pt-0">
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px] font-bold leading-[120%] tracking-[1%]"
          style={{
            fontFamily: 'Druk, sans-setif',
          }}
        >
          LEGAL
        </span>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Terms
        </Link>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px] font-bold leading-[120%] tracking-[1%]"
          style={{
            fontFamily: 'Druk, sans-setif',
          }}
        >
          COMPANY
        </span>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          About
        </Link>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Whitepaper
        </Link>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Tech
        </Link>
      </div>
      <div className="flex flex-col border-t md:border-t-0 border-grey pt-5 md:pt-0">
        <span
          className="text-[#939097] text-[16px] font-bold leading-[120%] tracking-[1%]"
          style={{
            fontFamily: 'Druk, sans-setif',
          }}
        >
          CONTACT
        </span>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Telegram
        </Link>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          X
        </Link>
        <Link
          className="text-[18px] font-medium text-white md:text-[#939097]"
          to="/"
        >
          Discord
        </Link>
      </div>
    </div>
  );
}
