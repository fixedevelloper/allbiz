'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import { Roulette} from "../../types/types";
import axiosServices from "../../lib/axios";



export default function Roulettes() {
    const { data: session } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roulettes, setRoulettes] = useState<Roulette[]>([]);

    useEffect(() => {
        const fetchRoulettes = async () => {
            try {
                const res = await axiosServices.get("/api/roulettes");
                setRoulettes(res.data.data ?? res.data);
            } catch {
                setError("Impossible de charger vos roulettes");
            } finally {
                setLoading(false);
            }
        };
        fetchRoulettes();
    }, []);

    if (!session) {
        router.push("/");
        return null;
    }

    const statusStyle = (status: boolean) => {
        switch (status) {
            case true:
                return "bg-green-100 text-green-700";
            case false:
                return "bg-gray-200 text-gray-500";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-24">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-32 rounded-b-3xl shadow-md" />

            <div className="relative -mt-20 px-4 flex justify-center">
                <div className="w-full max-w-md">

                    {/* Title */}
                    <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
                        🎰 Mes Roulettes
                    </h2>

                    {loading && (
                        <p className="text-center text-gray-500 animate-pulse">
                            Chargement des roulettes...
                        </p>
                    )}

                    {error && (
                        <p className="text-center text-red-600">{error}</p>
                    )}

                    {!loading && roulettes.length === 0 && (
                        <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500">
                            Aucune roulette disponible pour le moment
                        </div>
                    )}

                    {/* Roulette cards */}
                    <div className="space-y-4">
                        {roulettes.map((roulette) => (
                            <div
                                key={roulette.id}
                                className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
                            >
                                {/* Info */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Roulette #{roulette.id}
                                    </p>

                                    <p className="text-lg font-bold text-gray-800">
                                        💰 {roulette.amount.toLocaleString()} FCFA
                                    </p>

                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                                            roulette.status
                                        )}`}
                                    >
                    {!roulette.status
                        ? "Disponible"
                        :  "Déjà jouée"}
                  </span>
                                </div>

                                {/* Action */}
                                <button
                                    disabled={roulette.status}
                                    onClick={() => router.push(`/dashboard/roulettes/${roulette.id}`)}
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
                                        !roulette.status
                                            ? "bg-[#014d74] text-white hover:bg-[#01385a]"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    🎲 Jouer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

