import { Faq } from './faq';

export function FaqContainer() {
  return (
    <div className="flex justify-center pb-10">
      <div className="bg-[#100D16] rounded-xl py-8 px-4 w-full sm:w-[400px] md:w-[440px]">
        <Faq
          faq={[
            {
              question: 'What is Grail?',
              answer:
                'Grail is a technology for trustlessly bridging bitcoin to other blockchains using zero-knowledge cryptography. BOS verified the first ZK proof on Bitcoin in July 2024, finally demonstrating that this long-awaited, key technical unlock was possible for the most popular chain.',
            },
            {
              question: 'What blockchains can I bridge my BTC into with Grail?',
              answer:
                'Currently, Grail is only available on Ethereum. We are working on adding support for more chains in the future.',
            },
            {
              question:
                'Bitcoin bridges already exist. What makes Grail special?',
              answer:
                'Bitcoin bridges already exist. What makes Grail special is that it is the first to use zero-knowledge cryptography to prove that a user has a valid bitcoin transaction, without revealing the transaction details. This allows users to bridge their BTC to other chains without revealing their private keys.',
            },
          ]}
        />
      </div>
    </div>
  );
}
