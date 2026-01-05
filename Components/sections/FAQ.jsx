import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function FAQ() {
    const { t } = useTranslation();
    const items = t("faq.items", { returnObjects: true });

    return (
        <div className="faq section-padding" id="faq">
            <div className="container">
                <h2>{t("faq.title")}</h2>
                <p>{t("faq.subtitle")}</p>
                <div className="faq-list">
                    {items.map((f,i)=>{
                        const [open,setOpen]=useState(false);
                        return (
                            <div key={i} className="faq-item">
                                <button onClick={()=>setOpen(!open)} className="faq-question">{f.q}</button>
                                {open && <div className="faq-answer">{f.a}</div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
