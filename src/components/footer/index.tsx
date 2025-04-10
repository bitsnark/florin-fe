import { FooterLinks } from './footer-links';

export function Footer() {
  return (
    <div className="w-full mt-auto">
      <div className="w-full flex flex-col md:flex-row h-[264px] p-5 md:pt-5 md:pr-64 md:pb-5 md:pl-5 justify-between">
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/bos-bridge-logo.png"
              alt="Grail Bridge Logo"
              className="hidden md:block"
              style={{
                width: 72,
                height: 72,
              }}
            />
            <span className="text-white font-bold text-sm">Grail Bridge</span>
          </div>
          <span className="font-inter text-[#939097] font-medium text-[15px] leading-[120%] tracking-[-0.02em]">
            © {new Date().getFullYear()} BitcoinOS
          </span>
        </div>
        <FooterLinks />
      </div>
    </div>
  );
}
