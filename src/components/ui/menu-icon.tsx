interface MenuIconProps {
  isOpen: boolean;
  onClick?: () => void;
}

export function MenuIcon({ isOpen, onClick }: MenuIconProps) {
  return (
    <div
      className="text-white relative bg-[#2A2730] h-[72px] w-[72px] flex items-center justify-center rounded-lg p-0 cursor-pointer"
      onClick={onClick}
    >
      {isOpen ? (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="6" height="6" fill="white" />
          <rect x="30" width="6" height="6" fill="white" />
          <rect x="10" y="10" width="6" height="6" fill="white" />
          <rect x="20" y="10" width="6" height="6" fill="white" />
          <rect x="10" y="20" width="6" height="6" fill="white" />
          <rect x="20" y="20" width="6" height="6" fill="white" />
          <rect y="30" width="6" height="6" fill="white" />
          <rect x="30" y="30" width="6" height="6" fill="white" />
        </svg>
      ) : (
        <div className="w-[36px] h-[36px] grid grid-cols-4 grid-rows-4 gap-[4px]">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white w-1.5 h-1.5"></div>
            ))}
        </div>
      )}
    </div>
  );
}
