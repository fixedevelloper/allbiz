import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../Components/Layout/Layout";
import API from "../utils/axios";
import RouletteWheel from "../../Components/Elements/RouletteWheel";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const RoulettePlay = () => {
    const router = useRouter();
    const { id } = router.query;
    const { status } = useSession();
    const { t } = useTranslation();

    const [roulette, setRoulette] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || status !== "authenticated") return;

        API.get(`/roulettes/${id}`)
            .then((res) => {
                setRoulette(res.data.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || t("roulettePlay.roulette_not_found"));
                router.push("/roulettes");
            })
            .finally(() => setLoading(false));
    }, [id, status]);

    if (loading) return <p>{t("roulettePlay.loading")}</p>;
    if (!roulette) return null;

    return (
        <Layout>
            <div className="roulette-page mb-50">
                <div className="container">
                    <div className="roulette-card mx-auto text-center">
                        <h2 className="roulette-title">
                            🎡 {t("roulettePlay.roulette_play")}
                        </h2>

                        <p className="roulette-subtitle">
                            {t("roulettePlay.try_your_luck")}
                        </p>

                        <div className="roulette-wheel-wrappe">
                            <RouletteWheel
                                rouletteId={roulette.id}
                                type={roulette.type} // 1step | 2step
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default RoulettePlay;
