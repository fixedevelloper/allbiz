"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import axiosServices from "../lib/axios";

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
type RouletteType = "1step" | "2step"
interface RouletteWheelProps {
    rouletteId: number
    type: string
}
const RouletteWheel = ({ rouletteId, type }: RouletteWheelProps) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [gain, setGain] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const data = type === "1step" ? data1Step : data2Step;

    const spinRoulette = async () => {
        if (loading || mustSpin) return;

        setLoading(true);
        setError(null);
        setGain(null);

        try {
            const res = await axiosServices.post(`/api/roulette/${rouletteId}/spin`);

            const gainValue = Number(res.data.gain);
            const index = data.findIndex(
                (d) => Number(d.option) === gainValue
            );

            // fallback sécurité
            setPrizeNumber(index >= 0 ? index : 0);
            setGain(gainValue);
            setMustSpin(true);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Impossible de lancer la roulette"
            );
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">

            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                backgroundColors={["#16a085", "#0F766E"]}
                textColors={["#ffffff"]}
                outerBorderColor="#014d74"
                outerBorderWidth={8}
                innerBorderColor="#ecf0f1"
                radiusLineColor="#ffffff"
                radiusLineWidth={2}
                fontSize={16}
                onStopSpinning={() => {
                    setMustSpin(false);
                    setLoading(false);
                }}
            />

            {/* Résultat */}
            {gain && !mustSpin && (
                <div className="text-center text-lg font-bold text-green-600">
                    🎉 Gain : {gain.toLocaleString()} FCFA
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Bouton */}
            <button
                onClick={spinRoulette}
                disabled={loading || mustSpin}
                className={`w-full max-w-xs rounded-xl py-3 font-semibold text-white transition
          ${
                    loading || mustSpin
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#115E59] hover:opacity-90"
                }
        `}
            >
                {loading ? "⏳ Lancement..." : "🎡 Lancer la roulette"}
            </button>
        </div>
    );
};

export default RouletteWheel;
