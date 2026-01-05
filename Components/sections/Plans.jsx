import { useTranslation } from "react-i18next";

export default function Plans() {
    const { t } = useTranslation();
    const plans = ["starter","pro","vip"].map(p => t(`plans.${p}`, { returnObjects: true }));

    return (
        <div className="features section-padding" id="features" style={{ background: "#fff" }}>
            <div className="container">
                <div className="row py-lg-5 justify-content-center">
                    <div className="col-xl-6">
                        <div className="section_heading">
                <h2>{t("plans.title")}</h2>
                <p>{t("plans.subtitle")}</p>
                        </div></div></div>
                <div className="plans-grid  text-center">
                    <img
                        src="/images/gain.jpeg"
                        alt="Roulette investissement"
                    />
{/*                    {plans.map((p,i)=>(
                        <div key={i} className={`plan-card ${p.name==="Pro"?"featured":""}`}>
                            {p.name==="Pro" && <span className="badge">Populaire</span>}
                            <h3>{p.name}</h3>
                            <p className="price">{p.price}</p>
                            <ul>{p.benefits.map((b,j)=><li key={j}>{b}</li>)}</ul>
                            <a href="/register" className="btn-plan">{p.btn}</a>
                        </div>
                    ))}*/}
                </div>
            </div>
        </div>
    );
}
