import React, { useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import API from "../../pages/utils/axios";
const Wheel = dynamic(
    () => import("react-custom-roulette").then((mod) => mod.Wheel),
    { ssr: false }
);

const data1Step = [
    { option: "300" },
    { option: "350" },
    { option: "400" },
    { option: "450" },
    { option: "500" },
];

const data2Step = [
    { option: "800" },
    { option: "850" },
    { option: "900" },
    { option: "950" },
    { option: "1000" },
];

const RouletteWheel = ({ rouletteId, type }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [loading, setLoading] = useState(false);

    const data = type === "1step" ? data1Step : data2Step;

    const spinRoulette = async () => {
        if (loading || mustSpin) return;

        setLoading(true);

        try {
            const res = await API.post(`/roulette/${rouletteId}/spin`);

            const gain = res.data.gain.toString();
            const index = data.findIndex(d => d.option === gain);

            setPrizeNumber(index >= 0 ? index : 0);

            setLoading(false); // ✅ IMPORTANT
            setMustSpin(true); // démarre animation

        } catch (err) {
            toast.error(err.response?.data?.message || "Erreur roulette");
            setLoading(false);
        }
    };


    return (
        <div className="text-center">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={["#2ecc71", "#27ae60"]}
                textColors={["#fff"]}
                outerBorderColor="#16a085"
                outerBorderWidth={8}
                innerBorderColor="#ecf0f1"
                radiusLineColor="#fff"
                radiusLineWidth={2}
                fontSize={16}
                onStopSpinning={() => {
                    setMustSpin(false);
                    setLoading(false);
                    toast.success(`🎉 Gain : ${data[prizeNumber].option} FCFA`);
                }}
            />

            <button
                className="btn btn-success mt-4"
                disabled={mustSpin || loading}
                onClick={spinRoulette}
            >
                {loading ? "Lancement..." : "🎡 Lancer la roulette"}
            </button>
        </div>
    );
};

export default RouletteWheel;
