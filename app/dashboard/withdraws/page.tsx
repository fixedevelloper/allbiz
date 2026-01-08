'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import type { Withdraw } from "../../types/types";

import axiosServices from "../../lib/axios";




export default function Withdraw() {
    const { data: session } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [withdraws, setWithdraws] = useState<Withdraw[]>([]);

    useEffect(() => {
        const fetchWithdraws = async () => {
            try {
                const res = await axiosServices.get("/api/withdraws");
                setWithdraws(res.data.data ?? res.data);
            } catch {
                setError("Impossible de charger vos retraits");
            } finally {
                setLoading(false);
            }
        };
        fetchWithdraws();
    }, []);

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero / Header */}
            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center relative">
                    <h2 className="text-2xl font-bold text-gray-800">💸 Mes Retraits</h2>

                    {/* FAB Icon */}
                    <button
                        onClick={() => router.push("/dashboard/withdraws/new")} // page de création de retrait
                        className="absolute bottom-[-20px] right-6 bg-[#0F766E] hover:bg-[#014d74] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>


            <div className="flex flex-col items-center px-4 mt-6 w-full max-w-md mx-auto space-y-4">
                {loading && (
                    <p className="text-gray-500 animate-pulse text-center mt-8">
                        Chargement des retraits...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 text-center mt-8">{error}</p>
                )}

                {!loading && withdraws.length === 0 && (
                    <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500 mt-8 w-full">
                        Aucun retrait disponible pour le moment
                    </div>
                )}

                {/* Retrait cards */}
                {withdraws.map((withdraw) => (
                    <div
                        key={withdraw.id}
                        className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col gap-2 hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Retrait #{withdraw.id}</p>
                            <p className={`text-xs font-semibold ${withdraw.status ? "text-green-600" : "text-red-600"}`}>
                                {withdraw.status ? "✅ Validé" : "⏳ En attente"}
                            </p>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">💰 Montant</p>
                                <p className="text-lg font-bold text-[#0F766E]">{withdraw.amount.toLocaleString()} FCFA</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={withdraw.operator?.image_url}
                                    alt={withdraw.operator?.name}
                                    className="w-8 h-8 object-contain rounded-full"
                                />
                                <p className="text-gray-800 font-semibold">{withdraw.operator?.name}</p>
                            </div>
                        </div>

                        <p className="text-right text-gray-400 text-xs">
                            {new Date(withdraw.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            <BottomNav />
        </div>
    );
}

