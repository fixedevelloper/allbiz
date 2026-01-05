import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();
    return (
        <div className="contact-form section-padding" id="contact" style={{ background: "#fff" }}>
            <div className="container">
                <div className="row py-lg-5 justify-content-center">
                    <div className="col-xl-6">
                        <div className="section_heading">
                <h2>{t("contact.title")}</h2>
                <p>{t("contact.subtitle")}</p>
                        </div></div></div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="info-list">
                        <ul>
                            <li><i className="fa fa-map-marker"></i>{t("contact.address")}</li>
                            <li><i className="fa fa-phone"></i>{t("contact.phone")}</li>
                            <li><i className="fa fa-envelope"></i>{t("contact.email")}</li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <form method="post" name="myform" className="contact_validate">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="contactName">{t("contact.formName")}</label>
                                        <input type="text" className="form-control" id="contactName" placeholder={t("contact.formName")} name="firstname" />
                                    </div>
                                </div>
       <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="contactEmail">{t("contact.formEmail")}</label>
                                            <input type="email" className="form-control" name="email" placeholder={t("contact.formEmail")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control p-3" name="message" rows="5" placeholder={t("contact.formMessage")}></textarea>
                                </div>
                            </div>
                    </div>

                            <button type="submit" className="btn btn-primary px-4">{t("contact.formSubmit")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
