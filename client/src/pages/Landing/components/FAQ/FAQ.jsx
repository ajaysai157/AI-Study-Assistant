import Section from "../../../../components/ui/Section";

import FAQItem from "./FAQItem";
import faqs from "./faqData";

function FAQ() {
  return (
    <Section
      id="faq"
      className="bg-slate-50"
      padding="py-24"
    >
      <div className="mx-auto max-w-3xl text-center">

        <p className="font-semibold uppercase tracking-widest text-emerald-600">
          FAQ
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Frequently Asked Questions
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Everything you need to know before getting started with StudyFlow.
        </p>

      </div>

      <div className="mx-auto mt-16 max-w-4xl space-y-5">

        {faqs.map((faq) => (
          <FAQItem
            key={faq.question}
            {...faq}
          />
        ))}

      </div>
    </Section>
  );
}

export default FAQ;