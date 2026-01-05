import { useTranslation } from "react-i18next";

export default function Steps() {
    const { t } = useTranslation();
    const steps = [1,2,3,4].map(n => t(`steps.step${n}`, { returnObjects: true }));

    return (
        <div className="market section-padding page-section how-it-works" id="how-it-works">
            <div className="container">
                <div className="row py-lg-5 justify-content-center">
                    <div className="col-xl-6">
                        <div className="section_heading">
                <h2>{t("steps.title")}</h2>
                <p>{t("steps.subtitle")}</p>
                        </div></div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="steps">
                    {steps.map((s,i) => (
                        <div key={i} className="step">
                            <span className="step-number">{i+1}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
                                </div></div></div></div></div>
            </div></div>
    );
}
