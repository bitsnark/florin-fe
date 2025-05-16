interface CircleProgressProps {
  progress: number;
}

export function CircleProgress({ progress }: CircleProgressProps) {
  // Calculate the circle progress path
  const calculateCirclePath = () => {
    // Progress goes from 0 to 360 degrees
    const angle = (progress / 100) * 360;

    // Convert progress to SVG arc parameters
    // For a circle with radius 16.5px and center at 19,19
    const radius = 16.5;
    const centerX = 19;
    const centerY = 19;

    // Calculate end point on circle
    const endX = centerX + radius * Math.sin(angle * (Math.PI / 180));
    const endY = centerY - radius * Math.cos(angle * (Math.PI / 180));

    // Large arc flag is 0 for angles <= 180, 1 for angles > 180
    const largeArcFlag = angle <= 180 ? 0 : 1;

    return `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="16.5" stroke="#333333" strokeWidth="5" />
      <path
        d={calculateCirclePath()}
        stroke="#4CAF50"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
