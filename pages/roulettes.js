import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../Components/Layout/Layout";
import API from "./utils/axios";
import {useTranslation} from "react-i18next";

export default function Roulettes() {
    const { t } = useTranslation();

    const { status } = useSession();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated") return;

        API.get("/roulettes")
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.error("ROULETTES ERROR", err);
            })
            .finally(() => setLoading(false));
    }, [status]);

    if (loading) return <p>Loading...</p>;

    return (
        <Layout>
            <div className="homepage mb-50 mt-5">
                <div className="container">
                    <h2>🎡 {t("roulettes.title")}</h2>

                    <div className="card mt-10">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Gain</th>
                                    <th>Status</th>
                                    <th>Exécutée le</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            {t("roulettes.noRoulette")}
                                        </td>

                                    </tr>
                                )}

                                {data.map((ref) => (
                                    <tr key={ref.id}>
                                        <td>{new Date(ref.created_at).toLocaleDateString()}</td>
                                        <td>{ref.type === "1step" ? t("roulettes.oneSpin") : t("roulettes.twoSpins")}</td>

                                        <td>{ref.status ? `${ref.amount} FCFA` : "-"}</td>

                                        <td>
                                            {ref.status ? (
                                                <span className="badge bg-success">{t("roulettes.played")}</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark">{t("roulettes.pending")}</span>
                                            )}
                                        </td>

                                        <td>{ref.executed_at ? new Date(ref.executed_at).toLocaleDateString() : "-"}</td>


                                        <td>
                                            {ref.status ? (
                                                <span className="text-muted">—</span>
                                            ) : (
                                                <Link href={`/roulette-play/${ref.id}`} className="btn btn-warning btn-sm">
                                                    🎡 {t("roulettes.play")}
                                                </Link>
                                            )}
                                        </td>
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

