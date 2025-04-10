import { Faq } from './faq';

export function FaqContainer() {
  return (
    <div className="flex justify-center pb-10">
      <div className="bg-primary rounded-xl py-8 px-4 w-[440px]">
        <Faq
          faq={[
            {
              question: 'Is it accessible?',
              answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
            },
            {
              question: 'Is it styled?',
              answer:
                'Yes. It comes with default styles that matches the other components&apos; aesthetic.',
            },
            {
              question: 'Is it animated?',
              answer:
                'Yes. It&apos;s animated by default, but you can disable it if you prefer.',
            },
          ]}
        />
      </div>
    </div>
  );
}
