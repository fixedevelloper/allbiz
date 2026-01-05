import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t, i18n } = useTranslation();

    return (
        <div className="intro section-padding position-relative" id="intro">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-md-6">
                    <div className="intro-content">
                <h1>{t("hero.title")} <span style={{ color: "#f39c12" }}>{t("hero.subtitle")}</span></h1>
                <p>{t("hero.description")}</p>
                <a href="#plans" className="btn">{t("hero.start")}</a>
                <a href="#how-it-works" className="btn btn-dark">{t("hero.how")}</a>
            </div>
            </div>
                <div className="col-xl-4 col-md-6 py-md-5">
                    <div className="card">
                        <div className="card-body text-center">
                            <img
                                src="/images/roullette.jpeg"
                                width="300"
                                alt="Roulette investissement"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
