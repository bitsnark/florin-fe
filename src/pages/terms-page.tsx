export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pb-12">
      <main className="w-full max-w-2xl flex flex-col items-center mt-8 font-inter">
       <h4 className="mb-9 font-normal font-inter text-[16px] leading-[120%] tracking-[1%]">Grail bridge</h4>
        <h1 className="terms-title">Terms and Conditions</h1>
        <section className="w-full">
          <h2 className="terms-section-title my-8">1. Introduction</h2>
          <p className="terms-paragraph mb-4">
            These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and BTC OS Limited, a British Virgin Islands company, together with its affiliates, successors, and assigns ("Bridge Operator," "we," "us," or "our"), governing your access to and use of the BitcoinOS Grail Bridge and all related websites, smart contracts, APIs, mobile applications, dashboards, documentation, and communication channels (collectively, the "Site" or "Services").
          </p>
          <p className="terms-paragraph mb-4">
            By (i) accessing or using the Site; (ii) clicking "I Agree," "Connect," or a similar button; or (iii) signing a transaction that interacts with our smart contracts, you acknowledge that you have read, understood, and agreed to be bound by these Terms and by our Privacy Policy (incorporated herein by reference). If you do not agree, do not access or use the Services.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">2. Eligibility, Compliance & Onboarding</h2>
          <p className="terms-paragraph mb-2">2.1 You must:</p>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li>be at least 18 years old and have full legal capacity;</li>
            <li>not be a "Prohibited Person" (see §9);</li>
            <li>comply with all applicable laws, regulations, and self-regulatory rules regarding anti-money-laundering ("AML"), counter-terrorist-financing ("CTF"), economic sanctions, tax, and consumer protection; and</li>
            <li>use only non-custodial wallets of which you are the lawful controller.</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">3. Description of Services</h2>
          <p className="terms-paragraph mb-4">
            Our bridge enables Users to transfer native Bitcoin ("BTC") from the Bitcoin network to other supported blockchains by locking BTC in a non-custodial vault and minting or releasing a corresponding wrapped or synthetic representation on a target chain ("Bridged Asset"). The reverse flow ("redeeming") is supported where technically feasible. We do not custody User assets; all transfers are executed by autonomous smart contracts or decentralized validator sets.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">4. Non-Custodial & Experimental Technology</h2>
          <p className="terms-paragraph mb-2 font-semibold">YOU ACKNOWLEDGE THAT:</p>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li>The Services are non-custodial; we never take possession of your private keys.</li>
            <li>Smart contracts are experimental and may contain vulnerabilities that could result in partial or total loss of assets.</li>
            <li>Bridged Assets may not maintain parity with native BTC in price, liquidity, or regulatory treatment.</li>
            <li>Blockchain transactions are irreversible; if you send assets to an incorrect address or unsupported chain, they may be permanently lost.</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">5. User Responsibilities</h2>
          <p className="terms-paragraph mb-2">5.1 You are solely responsible for:</p>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li>verifying target addresses, network compatibility, and gas fees;</li>
            <li>safeguarding your seed phrases, private keys, and devices;</li>
            <li>maintaining updated wallet software;</li>
            <li>paying all network fees, bridge fees, and third-party charges (§6); and</li>
            <li>determining, reporting, and paying all taxes arising from your use of the Services.</li>
          </ul>
          <p className="terms-paragraph mb-2">5.2 You must not:</p>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li>engage in market manipulation, wash trading, or any abusive trading strategy;</li>
            <li>use the Site to launder money, finance terrorism, evade sanctions, or violate any law;</li>
            <li>interfere with, test, or attack the Services (e.g., through bots, exploits, or denial-of-service);</li>
            <li>infringe any intellectual-property right;</li>
            <li>upload viruses or malicious code;</li>
            <li>impersonate another person or misrepresent affiliation; or</li>
            <li>access or use the Services if you are a Prohibited Person (§9).</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">6. Fees</h2>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li><span className="font-semibold">6.1 Bridge Fees.</span> Each transfer may incur a protocol or validator fee, displayed in-app prior to execution. Fees are non-refundable once a transaction is broadcast.</li>
            <li><span className="font-semibold">6.2 Network Fees.</span> You must pay all blockchain transaction ("gas") fees.</li>
            <li><span className="font-semibold">6.3 Fee Changes:</span> We may modify fee schedules at any time by updating the Site; new fees apply to transactions initiated after the update.</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">7. Risk Disclosures</h2>
          <p className="terms-paragraph mb-4">
            Digital assets, including BTC and Bridged Assets, involve a high degree of risk. Prices can be volatile, and regulatory frameworks may change. By using the Services, you accept and assume all risks, including—but not limited to—smart-contract exploits, validator slashing, blockchain reorganizations, network congestion, cross-chain incompatibilities, third-party protocol failures, and total loss of digital assets.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">8. No Advice</h2>
          <p className="terms-paragraph mb-4">
            All content provided by us is for general informational purposes only and should not be construed as investment, legal, tax, or accounting advice. We make no representations regarding the suitability or profitability of any digital asset or strategy.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">9. Prohibited Persons & Jurisdictions</h2>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li>subject to economic sanctions administered or enforced by OFAC, the EU, the UK, the UN, or any equivalent authority;</li>
            <li>located, organized, or resident in Cuba, Iran, North Korea, Syria, the Crimea region, or any other embargoed jurisdiction;</li>
            <li>identified on any sanctions or terrorism watch list; or</li>
            <li>a citizen or resident of a jurisdiction where access to or use of the Services is prohibited by law (collectively, "Prohibited Persons").</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">10. Intellectual Property</h2>
          <p className="terms-paragraph mb-4">
            All Site content, trademarks, logos, and software are owned by or licensed to BTC OS limited and protected by applicable laws. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site for its intended purposes. Any other use is prohibited without our prior written consent.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">11. Third-Party Content & Links</h2>
          <p className="terms-paragraph mb-4">
            The Site may reference or link to third-party protocols, data feeds, wallets, or websites. We do not control and are not responsible for such resources. Your interactions with third parties are solely between you and that third party.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">12. Suspension & Termination</h2>
          <p className="terms-paragraph mb-4">
            We may, at our sole discretion and without liability, suspend, restrict, or terminate your access to any portion of the Services at any time, including but not limited to cases of security threats, suspected unlawful activity, or breach of these Terms.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">13. Disclaimer of Warranties</h2>
          <p className="terms-paragraph mb-4">
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES—EXPRESS OR IMPLIED—INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, NOR THAT ANY DEFECTS WILL BE CORRECTED.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">14. Limitation of Liability</h2>
          <p className="terms-paragraph mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BRIDGE OPERATOR (INCLUDING ITS DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, OR AGENTS) BE LIABLE FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES; ANY LOSS OF PROFITS, DATA, OR GOODWILL; OR ANY LOSS OR THEFT OF DIGITAL ASSETS, EVEN IF ADVISED OF THE POSSIBILITY. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF (I) USD 100 OR (II) THE TOTAL FEES PAID BY YOU TO US DURING THE SIX-MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">15. Indemnification</h2>
          <p className="terms-paragraph mb-4">
            You agree to indemnify, defend, and hold harmless Bridge Operator from and against any and all claims, damages, obligations, losses, liabilities, costs, or expenses (including attorneys' fees) arising out of or relating to: (a) your use of, or inability to use, the Services; (b) your violation of these Terms or any applicable law; (c) your infringement of any third-party right; or (d) your gross negligence, fraud, or willful misconduct.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">16. Governing Law & Dispute Resolution</h2>
          <ul className="list-disc pl-6 terms-paragraph mb-4 space-y-1">
            <li><span className="font-semibold">16.1 Governing Law.</span> These Terms and any non-contractual obligations shall be governed by, and construed in accordance with, the laws of the British Virgin Islands, excluding its conflict-of-laws rules.</li>
            <li><span className="font-semibold">16.2 Arbitration.</span> Any dispute arising from or relating to these Terms or the Services shall be finally settled by confidential, binding arbitration under the BVI IAC Rules in Road Town, Tortola by one arbitrator. Judgment on the award may be entered in any court of competent jurisdiction.</li>
            <li><span className="font-semibold">16.3 Class-Action Waiver.</span> You and Bridge Operator agree to resolve disputes only on an individual basis, and not as a plaintiff or class member in any purported class or representative proceeding.</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">17. Severability</h2>
          <p className="terms-paragraph mb-4">
            If any provision of these Terms is held to be invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">18. Entire Agreement</h2>
          <p className="terms-paragraph mb-4">
            These Terms constitute the entire agreement between you and Bridge Operator regarding your use of the Services and supersede all prior or contemporaneous understandings.
          </p>
        </section>
        <section className="w-full">
          <h2 className="terms-section-title my-8">19. Changes to Terms</h2>
          <p className="terms-paragraph mb-4">
            We may amend these Terms at any time by posting the revised version on the Site and updating the "Last updated" date. Changes take effect immediately for new users and 14 calendar days after posting for existing users. Your continued use of the Services after changes become effective constitutes acceptance.
          </p>
        </section>
      </main>
    </div>
  );
}
