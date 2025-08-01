import { useState } from "react";

// Accordion Component
interface FAQItem {
  title: string;
  content: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

const AccordionFAQ = ({ items }: AccordionFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full border border-grey-200 rounded-lg mx-auto p-4" id="accordion-open" data-accordion="open">
      {items.map((item: FAQItem, index: number) => (
        <div key={index} className="">
          {/* Accordion Header */}
          <h2 id={`accordion-open-heading-${index}`}>
            <button
              type="button"
              className={`flex items-center justify-between w-full p-2.5 md:p-5 border-b ${openIndex === index ? "bg-gray-50" : ""} hover:bg-gray-50`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`accordion-open-body-${index}`}
            >
              <span className="font-light text-primary md:text-lg">{item.title}</span>
              {/* Icon */}
              <svg
                className={`w-3 h-3 shrink-0 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>

          {/* Accordion Content */}
          <div
            id={`accordion-open-body-${index}`}
            className={`transition-all duration-300 ${openIndex === index ? "block" : "hidden"}`}
            aria-labelledby={`accordion-open-heading-${index}`}
          >
            <div className="p-2.5 md:p-5 text-primary font-light bg-gray-50 text-sm md:text-md">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionFAQ;