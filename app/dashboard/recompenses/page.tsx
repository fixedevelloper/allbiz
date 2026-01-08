'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import {Commission, Roulette} from "../../types/types";
import axiosServices from "../../lib/axios";



export default function Recompense() {
    const { data: session } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commissions, setCommissions] = useState<Commission[]>([]);

    useEffect(() => {
        const fetchCommissions = async () => {
            try {
                const res = await axiosServices.get("/api/commissions");
                setCommissions(res.data.data ?? res.data);
            } catch {
                setError("Impossible de charger vos commissions");
            } finally {
                setLoading(false);
            }
        };
        fetchCommissions();
    }, []);

    // ✅ Si non connecté, redirige vers accueil
    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero / Header */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">🎰 Mes récompenses</h2>
            </div>

            <div className="flex flex-col items-center px-4 mt-6 w-full max-w-md mx-auto space-y-4">
                {loading && (
                    <p className="text-gray-500 animate-pulse text-center mt-8">
                        Chargement des commissions...
                    </p>
                )}

                {error && (
                    <p className="text-red-600 text-center mt-8">{error}</p>
                )}

                {!loading && commissions.length === 0 && (
                    <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500 mt-8 w-full">
                        Aucune commission disponible pour le moment
                    </div>
                )}

                {/* Commission cards */}
                {commissions.map((commission) => (
                    <div
                        key={commission.id}
                        className="bg-white rounded-2xl shadow-md p-4 w-full flex flex-col gap-3 hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Commission #{commission.id}</p>
                            <p className="text-xs text-gray-500">{new Date(commission.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">💰 Montant de la commission</p>
                                <p className="text-lg font-bold text-[#0F766E]">{commission.amount.toLocaleString()} FCFA</p>
                            </div>
                            <div>
                                <p className="text-gray-600">📞 Référé</p>
                                <p className="text-lg font-semibold text-gray-800">{commission.phone ?? "N/A"}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600">💸 Montant investi</p>
                                <p className="text-lg font-semibold text-gray-800">{commission.investment_amount.toLocaleString()} FCFA</p>
                            </div>
                            <div>
                                <p className="text-gray-600">🎡 Roulettes</p>
                                <p className="text-lg font-semibold text-gray-800">{commission.roulette_count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BottomNav />
        </div>
    );
}


