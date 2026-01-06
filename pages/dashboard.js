import Link from "next/link";
import dynamic from "next/dynamic";
import Layout from "../Components/Layout/Layout";
import {useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import API from "../utils/axios";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const InvestmentsChart = dynamic(() => import("../Components/Chart/InvestmentsChart"), {
    ssr: false,
});
const getStatusBadge = (status) => {
    switch (status) {
        case "success":
            return <span className="badge text-bg-success">Success</span>;
        case "pending":
            return <span className="badge text-bg-warning">Pending</span>;
        case "failed":
            return <span className="badge text-bg-danger">Failed</span>;
        default:
            return "-";
    }
};

const getTypeBadge = (type) => {
    return type === "withdrawal"
        ? <span className="badge rounded-pill text-bg-danger">Withdrawal</span>
        : <span className="badge rounded-pill text-bg-success">Commission</span>;
};

export default function Dashboard() {
    const { t } = useTranslation();

    const [selectedTx, setSelectedTx] = useState(null);
    const { data: session, status } = useSession();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refLink, setRefLink] = useState("");
    useEffect(() => {
        if (status === "authenticated") {

            API.get("/user/dashboard")
                .then(res => {
                    setDashboard(res.data);
                    setLoading(false);
                });
            API.get("/user/referral-link")
                .then(res => setRefLink(res.data.referral_link));
        }
    }, [status, session]);

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
    if (status === "unauthenticated") {
        if (typeof window !== "undefined") window.location.href = "/auth/signin";
        return null;
    }

    return (
        <Layout>
            <div className="homepage mb-80">
                <div className="container">

                    {/* --- Solde + Roullettes --- */}
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card profile_chart">
                                <div className="card-header">
                                    <div className="chart_current_data">
                                        <h3>{dashboard.balance} FCFA</h3>
                                        <p className="text-success">
                                            {t("dashboard.rouletteGain")}: {dashboard.roulettes.gain} FCFA ({dashboard.roulettes.count})
                                        </p>
                                        <p className="text-warning">
                                            {t("dashboard.commissionGain")}: {dashboard.commissions.gain} FCFA ({dashboard.commissions.count})
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <InvestmentsChart investments={dashboard.investments} />
                                </div>
                            </div>
                        </div>

                        {/* --- Portfolio + Parrainage --- */}
                        <div className="col-xl-4 col-lg-4">
                            <div className="card balance-widget">
                                <div className="card-header pb-0 border-0">
                                    <h4 className="card-title">{t("dashboard.portfolio")}</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="balance-widget">
                                        <div className="total-balance">
                                            <h3>{dashboard.balance} FCFA</h3>
                                            <h6>{t("dashboard.totalBalance")}</h6>
                                        </div>

                                        <h6>{t("dashboard.investments")}</h6>
                                        <ul className="list-unstyled">

                                                <li className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <h5 className="m-0">
                                                            {t("dashboard.formula")} {dashboard.membership_level}
                                                        </h5>
                                                    </div>
                                                    <div className="text-right">
                                                        <h5>{dashboard.membership_level} FCFA</h5>
                                                    </div>
                                                </li>

                                        </ul>
                                        <h6 className="mt-2">
                                            {t("dashboard.referrals")}: {dashboard.referrals}
                                        </h6>
                                        <p>{t("dashboard.invite")}</p>

                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={refLink}
                                                readOnly
                                            />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(refLink);
                                                    toast.success("Lien copié !")
                                                }}
                                            >
                                                {t("dashboard.copy")}
                                            </button>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <a
                                                href={`https://wa.me/?text=${encodeURIComponent(
                                                    "Rejoins cette plateforme d’investissement : " + refLink
                                                )}`}
                                                target="_blank"
                                                className="btn btn-success"
                                            >
                                                WhatsApp
                                            </a>

                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`}
                                                target="_blank"
                                                className="btn btn-primary"
                                            >
                                                Facebook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Recent Activities --- */}
                    <div className="row mt-4">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0 d-flex justify-content-between">
                                    <h4 className="card-title">{t("dashboard.recentActivities")}</h4>
                                    <Link href="/history">{t("dashboard.seeMore")}</Link>
                                </div>
                                <div className="card-body">
                                    <div className="transaction-table">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-responsive-sm">
                                                      <tbody>

                                                {dashboard.recentActivities.length === 0 && (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            {t("dashboard.noTransactions")}
                                                        </td>

                                                    </tr>
                                                )}

                                                {dashboard.recentActivities.map((tx) => (
                                                    <tr
                                                        key={tx.id}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setSelectedTx(tx)}
                                                    >

                                                        <td>
            <span className={tx.type === "withdrawal" ? "sold-thumb" : "buy-thumb"}>
                <i className={tx.type === "withdrawal" ? "la la-arrow-down" : "la la-arrow-up"}></i>
            </span>
                                                        </td>

                                                        <td>{new Date(tx.created_at).toLocaleDateString()}</td>

                                                        <td className={tx.type === "withdrawal" ? "text-danger" : "text-success"}>
                                                            {tx.type === "withdrawal" ? "-" : "+"}
                                                            {tx.amount} FCFA
                                                        </td>

                                                        <td>{getTypeBadge(tx.type)}</td>

                                                        <td>{tx.meta?.operator ? tx.meta.operator.toUpperCase() : "-"}</td>

                                                        <td>{getStatusBadge(tx.status)}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {selectedTx && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {t("dashboard.transactionDetails")}
                                </h5>

                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setSelectedTx(null)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <ul className="list-group">

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.reference")}</strong>
                                        <span>{selectedTx.reference || "N/A"}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.amount")}</strong>
                                        <span>{selectedTx.amount} FCFA</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.type")}</strong>
                                        <span>{selectedTx.type}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.operator")}</strong>
                                        <span>{selectedTx.operator?.toUpperCase() || "-"}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.status")}</strong>
                                        <span>{selectedTx.status}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>{t("dashboard.date")}</strong>
                                        <span>
                                {new Date(selectedTx.created_at).toLocaleString()}
                            </span>
                                    </li>

                                </ul>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedTx(null)}
                                >
                                    {t("dashboard.close")}
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* backdrop */}
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setSelectedTx(null)}
                    />
                </div>
            )}
        </Layout>
    );
}


