import Link from 'next/link';
import React from 'react';
import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import LayoutFront from "../../Components/Layout/LayoutFront";
import {useTranslation} from "react-i18next";


export default function SignIn({ csrfToken }) {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/dashboard",
        });

        setLoading(false);

        if (res?.error) {
            setError(t("invalid_credentials"));
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <LayoutFront>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-4 col-md-6">
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">{t("signin.sign_in")}</h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="csrfToken" value={csrfToken} />

                                        <div className="form-group">
                                            <label>{t("signin.email")}</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="hello@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>{t("signin.password")}</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder={t("password")}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger mt-2">{error}</div>
                                        )}

                                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                            <label className="toggle">
                                                <input type="checkbox" className="toggle-checkbox" />
                                                <div className="toggle-switch"></div>
                                                <span className="toggle-label">{t("signin.remember_me")}</span>
                                            </label>

                                            <Link href="/reset">{t("signin.forgot_password")}</Link>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-100"
                                                disabled={loading}
                                            >
                                                {loading ? t("signin.signing_in") : t("signin.sign_in")}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="new-account mt-3">
                                        <p>
                                            {t("signin.no_account")}{" "}
                                            <Link className="text-primary d-inline-block" href="/auth/signup">
                                                {t("signin.sign_up")}
                                            </Link>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutFront>
    );
}


export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
