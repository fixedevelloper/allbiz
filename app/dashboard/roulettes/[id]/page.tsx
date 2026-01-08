"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axiosServices from "../../../lib/axios";
import BottomNav from "../../../components/BottomNav";
import Header from "../../../components/Header";
import RouletteWheel from "../../../components/RouletteWheel";
import { useParams, useRouter } from "next/navigation";



const RoulettePlay = () => {
    const router = useRouter();
    const { id } = useParams(); // 🔥 récupère /roulette/ID
    const { status } = useSession();

    const [roulette, setRoulette] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchRoulette = async () => {
            try {
                const res = await axiosServices.get(`/api/roulettes/${id}`);
                setRoulette(res.data.data ?? res.data);
            } catch {
                setError("Impossible de charger la roulette");
            } finally {
                setLoading(false);
            }
        };

        fetchRoulette();
    }, [id]);

    // 🔐 Auth
    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-32 rounded-b-3xl shadow-md" />

            <div className="relative -mt-20 px-4 flex justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

                    {/* Loading */}
                    {loading && (
                        <p className="text-center text-gray-500 animate-pulse">
                            Chargement de la roulette...
                        </p>
                    )}

                    {/* Error */}
                    {error && (
                        <p className="text-center text-red-600 font-medium">
                            {error}
                        </p>
                    )}

                    {/* Roulette */}
                    {!loading && roulette && (
                        <>
                            <h2 className="text-center text-xl font-bold text-gray-800 mb-4">
                                🎰 Roulette #{roulette.id}
                            </h2>

                            <div className="flex justify-center mb-6">
                                <RouletteWheel
                                    rouletteId={roulette.id}
                                    type={roulette.type} // 1step | 2step
                                />
                            </div>

                            <p className="text-center text-gray-500 text-sm">
                                Gain potentiel :{" "}
                                <span className="font-bold text-[#014d74]">
                  {roulette.amount?.toLocaleString()} FCFA
                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default RoulettePlay;
