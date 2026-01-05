import { useState,useEffect } from "react";
import Link from "next/link";
import API from "../../utils/axios";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import LayoutFront from "../../Components/Layout/LayoutFront";
import {toast} from "react-toastify"; // ton axios déjà configuré
import { signIn, getCsrfToken } from "next-auth/react";

const Signup = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        referrer_id: "",
    });

    const [investmentAmount, setInvestmentAmount] = useState(1000);

    useEffect(() => {
        if (router.query.ref) {
            setForm((prev) => ({
                ...prev,
                referrer_id: router.query.ref,
            }));
        }
    }, [router.query.ref]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const investmentDetails = {
        1000: { title: "Formule 1000F", description: "Gain fixe : 500F. Pas de roulette.", color: "#e0f7fa" },
        2000: { title: "Formule 2000F", description: "Gain fixe : 500-1000F selon niveau. Pas de roulette.", color: "#ffe0b2" },
        5000: { title: "Formule 5000F", description: "Gain : 500-2500F + 1 roulette.", color: "#d1c4e9" },
        10000: { title: "Formule 10000F", description: "Gain : 500-5000F + 2 roulettes.", color: "#c8e6c9" },
    };

    const handleInvestmentChange = (e) => setInvestmentAmount(parseInt(e.target.value));

    const handleNext = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone) {
            toast.error(t("signup.alert_fill_fields"))
            return;
        }

        try {
            const res = await API.post("/register", { ...form, investment_amount: investmentAmount });
            await signIn("credentials", { redirect: false, email: form.email, password: form.password });
            localStorage.setItem("token", res.data.token);
            setStep(2);
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || t("signup.alert_registration_error"))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/investments", { amount: investmentAmount, referrer_id: form.referrer_id });
            toast.success(t("signup.alert_registration_success"));
            router.push("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || t("signup.alert_investment_error"))
        }
    };

    return (
        <LayoutFront>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-6 col-md-6">
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">
                                        {step === 1 ? `${t("signup.step")} 1: ${t("signup.step1_title")}` : `${t("signup.step")} 2: ${t("signup.step2_title")}`}
                                    </h4>
                                </div>

                                <div className="card-body">
                                    {step === 1 && (
                                        <form onSubmit={handleNext}>
                                            <div className='row'>
                                                <div className="form-group col-md-6">
                                                    <label>{t("signup.full_name")}</label>
                                                    <input type="text" className="form-control" placeholder={t("signup.full_name")} name="name" value={form.name} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>{t("signup.email")}</label>
                                                    <input type="email" className="form-control" placeholder="hello@example.com" name="email" value={form.email} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>{t("signup.phone")}</label>
                                                    <input type="phone" className="form-control" placeholder="+229 056666666" name="phone" value={form.phone} onChange={handleChange} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>{t("signup.password")}</label>
                                                    <input type="password" className="form-control" placeholder="**********" name="password" value={form.password} onChange={handleChange} />
                                                </div>
                                                <input type="hidden" name="referrer_id" value={form.referrer_id} />
                                            </div>

                                            <div className="text-center mt-4">
                                                <button className="btn btn-success w-100" type="submit">{t("signup.next")}</button>
                                            </div>
                                        </form>
                                    )}

                                    {step === 2 && (
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card p-3" style={{ backgroundColor: investmentDetails[investmentAmount].color }}>
                                                    <h3>{investmentDetails[investmentAmount].title}</h3>
                                                    <p>{investmentDetails[investmentAmount].description}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label>{t("signup.choose_investment")}</label>
                                                        <select className="form-select form-select-lg" value={investmentAmount} onChange={handleInvestmentChange}>
                                                            <option value={1000}>1000F</option>
                                                            <option value={2000}>2000F</option>
                                                            <option value={5000}>5000F</option>
                                                            <option value={10000}>10000F</option>
                                                        </select>
                                                    </div>
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-success w-100" type="submit">{t("signup.validate_investment")}</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                    <div className="new-account mt-3">
                                        <p>{t("signup.already_account")}{" "}
                                            <Link className="text-primary d-inline-block" href="/auth/signin">{t("signup.sign_in")}</Link>
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
};


export default Signup;

