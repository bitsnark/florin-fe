import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqProps {
  faq: {
    question: string;
    answer: string;
  }[];
}

export function Faq({ faq }: FaqProps) {
  return (
    <>
      <h2 className="mb-4 font-inter font-medium text-2xl leading-none tracking-normal text-[#F5F5F5]">
        FAQ
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2"
      >
        {faq.map((item, index) => (
          <AccordionItem
            className="bg-[#2A2730] rounded-xl border-none focus:border-none focus:ring-0 focus:ring-offset-0 hover:border-none hover:ring-0 hover:ring-offset-0"
            key={`item-${index + 1}`}
            value={`item-${index + 1}`}
          >
            <AccordionTrigger className="text-[#F5F5F5] font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-[#B6BAC2] text-sm">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
