import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LayoutFront from "../Components/Layout/LayoutFront";

const Verify3 = () => {
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/verify4");
        }, 1500); // 1.5s pour laisser voir le loader

        return () => clearTimeout(timer);
    }, [router]);

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
                                            <i className="fa fa-shield"></i>
                                        </span>

                                        <h4>{t("verify.verifyingTitle")}</h4>
                                        <p>{t("verify.verifyingDesc")}</p>
                                    </div>

                                    <div className="upload-loading text-center mb-3">
                                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
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

export default Verify3;
