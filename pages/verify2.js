import { useTranslation } from "react-i18next";
import Link from "next/link";
import LayoutFront from "../Components/Layout/LayoutFront";

const Verify2 = () => {
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
                                        <h4>{t("verify.uploadTitle")}</h4>
                                        <span>{t("verify.uploadHint")}</span>
                                        <p>{t("verify.description")}</p>
                                    </div>

                                    <div className="form-group">
                                        <label className="me-sm-2">
                                            {t("verify.front")}
                                        </label>
                                        <span className="float-right">
                                            {t("verify.maxSize")}
                                        </span>
                                        <div className="file-upload-wrapper" data-text="front.jpg">
                                            <input
                                                type="file"
                                                className="file-upload-field"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="me-sm-2">
                                            {t("verify.back")}
                                        </label>
                                        <span className="float-right">
                                            {t("verify.maxSize")}
                                        </span>
                                        <div className="file-upload-wrapper" data-text="back.jpg">
                                            <input
                                                type="file"
                                                className="file-upload-field"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center mt-4">
                                        <Link
                                            href="/verify3"
                                            className="btn btn-success ps-5 pe-5"
                                        >
                                            {t("verify.submit")}
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

export default Verify2;
