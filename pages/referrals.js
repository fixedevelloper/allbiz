import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../Components/Layout/Layout";
import {Axios as axios} from "axios";
import API from "../utils/axios";
import {useTranslation} from "react-i18next";


export default function Referrals() {
    const { t } = useTranslation();

    const { data: session, status } = useSession();
    const [data, setData] = useState([]);
    const [total_referrals, setTotal_referrals] = useState('');
    const [total_commission, setTotal_commission] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status !== "authenticated") return;

        setLoading(true);

        API.get("/user/referrals")
            .then((res) => {

                setData(res.data.data);
                setTotal_commission(res.data.total_commission);
                setTotal_referrals(res.data.total_referrals);
            })
            .catch((err) => {
                console.error("REFERRALS ERROR", err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [status]);



    if (loading) {
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                    <div className="text-center">
                        <div className="spinner-border text-warning mb-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted">{t("history.loading")}</p>
                    </div>
                </div>
            </Layout>
        );
    }


    return (
        <Layout>
            <div className="homepage mb-50 mt-5">
            <div className="container">
                <h2>👥 {t("referrals.title")}</h2>


                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h5>{t("referrals.totalReferrals")}</h5>
                      <h3>{total_referrals}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h5>{t("referrals.totalCommission")}</h5>
                            <h3>{total_commission} F</h3>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>{t("referrals.name")}</th>
                                <th>{t("referrals.investment")}</th>
                                <th>{t("referrals.commission")}</th>
                                <th>{t("referrals.roulettes")}</th>
                                <th>{t("referrals.rouletteGain")}</th>
                                <th>{t("referrals.date")}</th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((ref) => (
                                <tr key={ref.id}>
                                    <td>{ref.name}</td>
                                    <td>{ref.investment} F</td>
                                    <td>{ref.commission} F</td>
                                    <td>{ref.roulette_count}</td>
                                    <td>{ref.roulette_gain} F</td>
                                    <td>{ref.joined_at}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
}
