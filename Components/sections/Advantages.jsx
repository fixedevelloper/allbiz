import { useTranslation } from "react-i18next";

export default function Advantages() {
    const { t } = useTranslation();
    const items = t("advantages.items", { returnObjects: true });

    return (
        <div className="portfolio section-padding" id="portfolio" style={{ background: "#fff" }}>
            <div className="container">
                <div className="row py-lg-5 justify-content-center">
                    <div className="col-xl-6">
                        <div className="section_heading">
                <h2>{t("advantages.title")}</h2>
                <p>{t("advantages.subtitle")}</p>
                        </div></div></div>
                <div className="advantages-grid">
                    {items.map((a,i)=>(
                        <div key={i} className="advantage-card">
                            <span className="icon">{a.icon}</span>
                            <h3>{a.title}</h3>
                            <p>{a.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
