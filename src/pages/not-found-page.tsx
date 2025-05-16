import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  // --- Placeholder values - Replace with Figma specs ---
  const mainText = 'Oops! 404!';
  const subText = 'page not found';
  const subText2 = 'It is okay! it happens sometimes!';
  const buttonText = 'Go Home';
  const homePath = '/'; // Or your specific home route
  // --- End Placeholder values ---

  return (
    <div className="flex flex-col items-center py-14">
      <h1 className="text-4xl font-bold mb-10">{mainText}</h1>
      <Link to={homePath} className="no-underline">
        <Card className="flex flex-row items-center justify-between bg-grey w-[265px] h-[88px] rounded-xl pt-2 pr-2 pb-2 pl-10 border-none mb-5 hover:opacity-90 transition-opacity">
          <span className="text-white font-bold">{buttonText}</span>
          <Button variant="orange" size="box">
            {'->'}
          </Button>
        </Card>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <p
          className="text-[24px] font-medium leading-[120%] tracking-[1%] text-center uppercase text-white mb-2"
          style={{ fontFamily: 'Druk, sans-setif' }}
        >
          {subText}
        </p>
        <p className="text-grey-border font-inter font-normal text-[17px] leading-[140%] tracking-[-1%] text-center w-[166px]">
          {subText2}
        </p>
      </div>
    </div>
  );
}

// Default export for potential lazy loading or default import conventions
export default NotFoundPage;
