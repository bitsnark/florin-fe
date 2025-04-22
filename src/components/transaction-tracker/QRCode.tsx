/* interface QRCodeProps {
  address: string;
}

 */// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function QRCode() {
  // The 'address' parameter would be used to generate a real QR code in a complete implementation
  return (
    <div className="flex flex-col items-center justify-center mt-3 md:mt-4">
      <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white p-2">
        {/* Hardcoded QR code image - in a real app this would be generated from the address */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="7" height="7" fill="#000000" />
          <rect x="14" width="7" height="7" fill="#000000" />
          <rect y="14" width="7" height="7" fill="#000000" />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 7 8)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 9 8)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 10 8)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 9 9)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 10 9)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 12 8)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 13 8)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 13 9)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 8 10)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 9 10)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 8 13)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 12 10)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 7 11)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 9 11)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 10 11)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 11 11)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 7 12)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 8 12)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 10 12)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 13 12)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 7 13)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 9 13)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 10 13)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 11 13)"
            fill="#000000"
          />
          <rect
            width="1"
            height="1"
            transform="matrix(1 0 0 -1 13 13)"
            fill="#000000"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 2 5)"
            fill="#000000"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 16 5)"
            fill="#000000"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 2 19)"
            fill="#000000"
          />
        </svg>
      </div>
      <span className="text-white text-[10px] md:text-xs mt-1 md:mt-2">
        BTC Address
      </span>
    </div>
  );
}
