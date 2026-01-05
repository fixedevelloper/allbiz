import { useTranslation } from "react-i18next";
import Link from "next/link";
import LayoutFront from "../Components/Layout/LayoutFront";

const Verify4 = () => {
    const { t } = useTranslation();

    return (
        <LayoutFront>
            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-4 col-md-6">
                            <div className="auth-form card">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        {t("verify.title")}
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <div className="identity-content text-center">
                                        <span className="icon">
                                            <i className="fa fa-check"></i>
                                        </span>

                                        <h4>{t("verify.successTitle")}</h4>
                                        <p>{t("verify.successDesc")}</p>
                                    </div>

                                    <div className="text-center mb-4">
                                        <Link
                                            href="/settings-security"
                                            className="btn btn-success ps-5 pe-5"
                                        >
                                            {t("verify.continue")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutFront>
    );
};

export default Verify4;
