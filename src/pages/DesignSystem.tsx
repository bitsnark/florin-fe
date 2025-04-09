/**
 * Design System Page
 *
 * This page serves as a living documentation of all UI components, colors, and styles
 * used throughout the Florin/Grail application. It provides a centralized reference for developers
 * to ensure visual consistency across the entire project.
 *
 * Purpose:
 * - Provides a single source of truth for the application's visual language
 * - Helps onboard new developers by showcasing all available components
 * - Serves as temporary documentation until more formal documentation is created
 * - Ensures consistency by documenting exact specs for colors, sizing, and styling
 *
 * Each component section displays:
 * - Live examples of the component in various states
 * - The actual code needed to implement each example (via "Show Code" button)
 * - Documentation about usage patterns and variations
 * - Design specifications including colors, dimensions, and spacing
 *
 * This page is not visible to end users and is intended only for development purposes.
 */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ComponentExample } from '@/components/component-example';
import { InputWithButton } from '@/components/input-with-button';
import { Hero } from '@/components/hero';
import heroImageGlobal from '@/assets/hero-image-global.png';

export function DesignSystem() {
  return (
    <div className="space-y-10 p-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Project Colors</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-orange"></div>
                <div>
                  <p className="font-medium">Orange</p>
                  <p className="text-sm opacity-70">bg-orange</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-orange-light"></div>
                <div>
                  <p className="font-medium">Orange Light</p>
                  <p className="text-sm opacity-70">bg-orange-light</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-grey"></div>
                <div>
                  <p className="font-medium">Grey</p>
                  <p className="text-sm opacity-70">bg-grey</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-grey-hover"></div>
                <div>
                  <p className="font-medium">Grey Hover</p>
                  <p className="text-sm opacity-70">bg-grey-hover</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-black"></div>
                <div>
                  <p className="font-medium">Black</p>
                  <p className="text-sm opacity-70">bg-black</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">System Colors</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-primary"></div>
                <div>
                  <p className="font-medium">Primary</p>
                  <p className="text-sm opacity-70">bg-primary</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-secondary"></div>
                <div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm opacity-70">bg-secondary</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-background"></div>
                <div>
                  <p className="font-medium">Background</p>
                  <p className="text-sm opacity-70">bg-background</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-foreground text-background flex items-center justify-center text-xs">
                  Aa
                </div>
                <div>
                  <p className="font-medium">Foreground</p>
                  <p className="text-sm opacity-70">text-foreground</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-6">
          <ComponentExample
            title="Button Variants"
            description="Different button styles for different purposes"
            code={`<Button variant="default">Default Button</Button>
<Button variant="orange">Orange Button</Button>
<Button variant="grey">Grey Button</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="default">
                Default Button
              </Button>
              <Button variant="orange" size="default">
                Orange Button
              </Button>
              <Button variant="grey" size="default">
                Grey Button
              </Button>
            </div>
          </ComponentExample>

          <ComponentExample
            title="Button Sizes"
            description="Buttons come in different sizes"
            code={`<Button variant="default" size="sm">Small Button</Button>
<Button variant="default" size="default">Default Button</Button>
<Button variant="default" size="lg">Large Button</Button>
<Button variant="orange" size="custom">Custom Size Button</Button>`}
          >
            <div className="flex flex-wrap gap-4 items-end">
              <Button variant="default" size="sm">
                Small Button
              </Button>
              <Button variant="default" size="default">
                Default Button
              </Button>
              <Button variant="default" size="lg">
                Large Button
              </Button>
              <Button variant="orange" size="custom">
                Custom Size Button
              </Button>
            </div>
          </ComponentExample>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="space-y-6">
          <ComponentExample
            title="Default Input"
            description="Standard input field with custom styling"
            code={`<Input placeholder="Connect your wallet first" />`}
          >
            <div className="space-y-4">
              <Input placeholder="Connect your wallet first" />
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded bg-input-bg border border-input-border"></div>
                <div>
                  <p className="font-medium">Input Background</p>
                  <p className="text-sm opacity-70">bg-input-bg</p>
                </div>
              </div>
            </div>
          </ComponentExample>

          <ComponentExample
            title="Input States"
            description="Different states of input fields"
            code={`<Input placeholder="0x35wp254729296a45a3885639AC7E10F9d5twdp" />
<Input placeholder="Input Disabled" disabled />
<Input placeholder="Input Invalid" aria-invalid="true" />
<Input
  placeholder="Input Focus"
  className="focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring"
/>`}
          >
            <div className="space-y-3">
              <Input placeholder="0x35wp254729296a45a3885639AC7E10F9d5twdp" />
              <Input placeholder="Input Disabled" disabled />
              <Input placeholder="Input Invalid" aria-invalid="true" />
              <Input
                placeholder="Input Focus"
                className="focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring"
              />
            </div>
          </ComponentExample>

          <ComponentExample
            title="Input with Icon"
            description="Input fields with icons for additional context"
            code={`<Input 
  placeholder="Search wallet address" 
  icon={<InfoCircledIcon />} 
/>
<Input 
  placeholder="Enter amount" 
  icon={/* SVG Plus Icon */} 
/>
<Input 
  placeholder="Copy to clipboard" 
  icon={/* SVG Clipboard Icon */}
/>`}
          >
            <div className="space-y-3">
              <Input
                placeholder="Search wallet address"
                icon={<InfoCircledIcon />}
              />
              <Input
                placeholder="Enter amount"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 2C7.77614 2 8 2.22386 8 2.5V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V2.5C7 2.22386 7.22386 2 7.5 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2.5 7C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H2.5Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
              <Input
                placeholder="Copy to clipboard"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </div>
          </ComponentExample>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Input with Button</h2>
        <div className="space-y-6">
          <ComponentExample
            title="Newsletter Subscription Input"
            description="Input with an embedded button for email subscription"
            code={`<InputWithButton
  placeholder="Enter your email"
  buttonText="Subscribe"
  onButtonClick={() => {}}
/>`}
          >
            <InputWithButton
              placeholder="Enter your email"
              buttonText="Subscribe"
              onButtonClick={() => {}}
            />
          </ComponentExample>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Labels</h2>
        <div className="space-y-6">
          <ComponentExample
            title="Label with Icon"
            description="Labels for form fields with information icons"
            code={`<Label>
  Ethereum sending address
  <InfoCircledIcon />
</Label>`}
          >
            <div className="flex items-center gap-4">
              <Label>
                Ethereum sending address
                <InfoCircledIcon />
              </Label>
              <div className="w-4 h-4 rounded-full bg-label-text"></div>
              <span className="text-xs">Color: #82868F</span>
            </div>
          </ComponentExample>

          <ComponentExample
            title="Label with Form Field"
            description="Labels connected to form inputs"
            code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="wallet-address">
    Ethereum sending address
    <InfoCircledIcon />
  </Label>
  <Input id="wallet-address" placeholder="Enter wallet address" />
</div>`}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="wallet-address">
                Ethereum sending address
                <InfoCircledIcon />
              </Label>
              <Input id="wallet-address" placeholder="Enter wallet address" />
            </div>
          </ComponentExample>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hero</h2>
        <div className="space-y-12">
          <ComponentExample
            title="Hero Center Variant"
            description="Hero component with centered content and image"
            code={`<Hero
  variant="center"
  topTitle="grail bridge"
  title="Send Bitcoin from Ethereum and back. Trustlessly."
  description="Florin is revolutionizing the way you manage cryptocurrency payments with seamless integrations, low fees, and instant transactions."
  imageSrc={heroImagePath}
  imageAlt="Hero Image"
/>`}
          >
            <Hero
              variant="center"
              topTitle="grail bridge"
              title="Send Bitcoin from Ethereum and back. Trustlessly."
              description="Florin is revolutionizing the way you manage cryptocurrency payments with seamless integrations, low fees, and instant transactions."
              imageSrc={heroImageGlobal}
              imageAlt="Hero Image"
            />
          </ComponentExample>
        </div>
      </section>
    </div>
  );
}
