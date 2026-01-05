import { useState } from "react";
import Testimonial from "./Testimonial";

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="faq-item">
            <button
                className="faq-question"
                onClick={() => setOpen(!open)}
            >
                {question}
            </button>
            {open && <div className="faq-answer">{answer}</div>}
        </div>
    );
};
export default FAQItem;