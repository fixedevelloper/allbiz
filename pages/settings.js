import Link from 'next/link';
import Layout from '../Components/Layout/Layout';
import API from "../utils/axios";
import React, {useEffect, useState} from 'react';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../utils/constants";
import {useTranslation} from "react-i18next";

const Settings = () => {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: "",
        email: "",
        dob: "",
        phone: "",
        presentaddress: "",
        permanentaddress: "",
        country: "",
        city: "",
    });

    const [profilePic, setProfilePic] = useState(null);
    const [profile, setProfile] = useState(null);
    const [old_password, setOldpassword] = useState("");
    const [new_password, setNewpassword] = useState("");
    const [loading, setLoading] = useState(true);

    // 🔹 Charger le profil
    useEffect(() => {
        setLoading(true);
        API.get("/me")
            .then((res) => {
                const data = res.data;
                setForm({
                    name: data.name || "",
                    email: data.email || "",
                    dob: data.dob || "",
                    phone: data.phone || "",
                    presentaddress: data.presentaddress || "",
                    permanentaddress: data.permanentaddress || "",
                    country: data.country || "",
                    city: data.city || "",
                });
                setProfile(data);
            })
            .catch(() => toast.error("Erreur lors du chargement du profil"))
            .finally(() => setLoading(false));
    }, []);


    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/me", form);
            toast.success("Profil mis à jour !");
        } catch (err) {
            toast.error(err.response?.data?.message || "Erreur mise à jour profil");
        }
    };

    // 🔹 Changer mot de passe
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!old_password || !new_password) return toast.error("Remplir tous les champs !");
        try {
            await API.post("/change-password", { old_password, new_password });
            toast.success("Mot de passe changé !");
            setOldpassword("");
            setNewpassword("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Erreur changement mot de passe");
        }
    };


    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        if (!profilePic) return toast.error("Choisissez une photo !");
        try {
            const formData = new FormData();
            formData.append("image", profilePic);
            await API.post("profile/photo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Photo de profil mise à jour !");
        } catch (err) {
            toast.error(err.response?.data?.message || "Erreur mise à jour photo");
        }
    };

    if (loading) return <div>Chargement...</div>;

    const imagePhoto=BASE_URL+'/storage/'+profile.image_url
    return (
        <Layout>
            <ToastContainer position="top-right" />
            <div className="settings mb-80">
                <div className="container">
                    <div className="row">
                        {/* Menu latéral */}
                        <div className="col-xl-3 col-md-4">
                            <div className="card settings_menu">
                                <div className="card-header">
                                    <h4 className="card-title">Settings</h4>
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

                        {/* Contenu */}
                        <div className="col-xl-9 col-md-8">
                            <div className="row">

                                {/* 🔹 Photo de profil séparée */}
                                <div className="col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">{t("settings.profilePicture")}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handlePhotoSubmit}>
                                                <div className="d-flex align-items-center mb-3">
                                                    {profilePic ? (
                                                        <img
                                                            src={URL.createObjectURL(profilePic)}
                                                            alt="preview"
                                                            className="rounded-circle"
                                                            width={55}
                                                            height={55}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={imagePhoto || '/images/profile/default.png'}
                                                            alt="profile"
                                                            className="rounded-circle"
                                                            width={55}
                                                            height={55}
                                                        />
                                                    )}

                                                    <div>
                                                        <p className="mb-0">{t("settings.maxFileSize")}</p>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="form-control mb-3"
                                                    onChange={(e) => setProfilePic(e.target.files[0])}
                                                />
                                                <button className="btn btn-success w-100"> {t("settings.uploadPhoto")}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* 🔹 Changement mot de passe */}
                                <div className="col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">{t("settings.changePassword")}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handlePasswordSubmit}>
                                                <div className="form-group mb-3">
                                                    <label>{t("settings.oldPassword")}</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={old_password}
                                                        onChange={(e) => setOldpassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>{t("settings.newPassword")}</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={new_password}
                                                        onChange={(e) => setNewpassword(e.target.value)}
                                                    />
                                                </div>
                                                <button className="btn btn-success w-100">{t("settings.changePassword")}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* 🔹 Informations personnelles */}
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">{t("settings.personalInfo")}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleProfileSubmit}>
                                                <div className="form-row row">
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.yourName")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={form.name}
                                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.email")}</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={form.email}
                                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.dob")}</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={form.dob}
                                                            onChange={(e) => setForm({ ...form, dob: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.presentAddress")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={form.presentaddress}
                                                            onChange={(e) => setForm({ ...form, presentaddress: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.permanentAddress")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={form.permanentaddress}
                                                            onChange={(e) => setForm({ ...form, permanentaddress: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.phone")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={form.phone}
                                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.country")}</label>
                                                        <select
                                                            className="form-control"
                                                            value={form.country}
                                                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                                                        >
                                                            <option value="">{t("settings.selectCountry")}</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CI">Côte d'Ivoire</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="TG">Togo</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-xl-6">
                                                        <label>{t("settings.city")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={form.city}
                                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-success w-100">  {t("settings.saveInfo")}</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default Settings;
