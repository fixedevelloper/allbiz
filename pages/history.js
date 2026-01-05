import React, {useEffect, useState} from 'react';
import Layout from '../Components/Layout/Layout';
import {useSession} from "next-auth/react";
import API from "./utils/axios";
import {useTranslation} from "react-i18next";

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



export default function History() {
    const { t } = useTranslation();
    const [selectedTx, setSelectedTx] = useState(null);
    const { data: session, status } = useSession();
    const [data, setData] = useState([]);
    const [total_withdrawn, setTotal_withdrawn] = useState('');
    const [total_commission, setTotal_commission] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated") return;

        setLoading(true);

        API.get("/user/transactions")
            .then((res) => {
                setData(res.data.data);
                setTotal_commission(res.data.total_commission);
                setTotal_withdrawn(res.data.total_withdrawn);
            })
            .catch((err) => console.error("REFERRALS ERROR", err))
            .finally(() => setLoading(false));
    }, [status]);

    return (
        <Layout>
            <div className="history mb-80">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <div className="card p-3">
                                <h5>{t("history.total_withdrawn")}</h5>
                                <h3>{total_withdrawn} FCFA</h3>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3">
                                <h5>{t("history.total_commission")}</h5>
                                <h3>{total_commission} FCFA</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="card-title">{t("history.transaction_history")}</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="transaction-table">
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-responsive-sm">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>{t("history.date")}</th>
                                                    <th>{t("history.amount")}</th>
                                                    <th>{t("history.type")}</th>
                                                    <th>{t("history.operator")}</th>
                                                    <th>{t("history.status")}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {loading && (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">{t("history.loading")}</td>
                                                    </tr>
                                                )}

                                                {!loading && data.length === 0 && (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">{t("history.no_transactions")}</td>
                                                    </tr>
                                                )}

                                                {data.map((tx) => (
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
                                                            {tx.type === "withdrawal" ? "-" : "+"}{tx.amount} FCFA
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

                {selectedTx && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">{t("history.transaction_history")}</h5>
                                    <button type="button" className="close" onClick={() => setSelectedTx(null)}>
                                        <span>&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.reference")}</strong>
                                            <span>{selectedTx.reference || "N/A"}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.amount")}</strong>
                                            <span>{selectedTx.amount} FCFA</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.type")}</strong>
                                            <span>{t(selectedTx.type)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.operator")}</strong>
                                            <span>{selectedTx.operator?.toUpperCase() || "-"}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.status")}</strong>
                                            <span>{selectedTx.status}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>{t("history.date")}</strong>
                                            <span>{new Date(selectedTx.created_at).toLocaleString()}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setSelectedTx(null)}>
                                        {t("history.close")}
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="modal-backdrop fade show" onClick={() => setSelectedTx(null)} />
                    </div>
                )}
            </div>
        </Layout>
    );
}