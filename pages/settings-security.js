import Link from 'next/link';
import React, {useEffect, useState} from 'react';

import { toast } from "react-toastify";
import Layout from '../Components/Layout/Layout';
import API from "./utils/axios";

import { useTranslation } from "react-i18next";

const SettingsSecurity = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        API.get("/me")
            .then((res) => setProfile(res.data))
            .catch(() => toast.error("Erreur lors du chargement du profil"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Layout>
            <div className="settings mb-80">
                <div className="container">
                    <div className="row">

                        {/* MENU */}
                        <div className="col-xl-3 col-md-4">
                            <div className="card settings_menu">
                                <div className="card-header">
                                    <h4 className="card-title">{t("settings.title")}</h4>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/settings">
                                                <i className="la la-user"></i>
                                                <span>{t("settings.editProfile")}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/settings-preferences">
                                                <i className="la la-cog"></i>
                                                <span>{t("settings.preferences")}</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/settings-security">
                                                <i className="la la-lock"></i>
                                                <span>{t("settings.security")}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="col-xl-9 col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">{t("settings.security")}</h4>
                                </div>
                                <div className="card-body">

                                    {/* KYC */}
                                    <div className="row align-items-center">
                                        <div className="col-xl-4">
                                            <img src="/images/id.png" className="img-fluid" />
                                        </div>
                                        <div className="col-xl-6">
                                            <h3>{profile?.name}</h3>
                                            <p>ID: 0024 5687 2254 3698</p>
                                            <p>
                                                {t("settings.idStatus")} :
                                                <span className="font-weight-bold">
                                                    {t("settings.verified")}
                                                </span>
                                            </p>
                                            <Link href="/verify1" className="btn btn-success mt-3">
                                                {t("settings.startVerification")}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* EMAIL */}
                                    <div className="row mt-4">
                                        <div className="col-xl-12">
                                            <Link href="/otp1" className="btn btn-success">
                                                {t("settings.emailVerification")}
                                            </Link>
                                        </div>
                                        <div className="col-xl-12 mt-2">
                                            <h5>
                                                <i className="fa fa-envelope"></i> {profile?.email}
                                            </h5>
                                            <span>
                                                <i className="la la-check"></i> {t("settings.verified")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* PHONE */}
                                    <div className="row mt-4">
                                        <div className="col-xl-12">
                                            <Link href="/otp2" className="btn btn-success">
                                                {t("settings.phoneVerification")}
                                            </Link>
                                        </div>
                                        <div className="col-xl-12 mt-2">
                                            <h5>
                                                <i className="fa fa-phone"></i> {profile?.phone}
                                            </h5>
                                            <span>
                                                <i className="la la-check"></i> {t("settings.verified")}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default SettingsSecurity;