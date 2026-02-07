'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import axiosServices from "../../lib/axios";


export default function MonInvestissement() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [profile, setProfile] = useState<any>(null);
    const [referrals, setReferrals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔐 Redirection si non connecté
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }
    }, [status, router]);

    // 📡 Chargement des données
    useEffect(() => {
        if (!session) return;

        const fetchData = async () => {
            try {
                const res = await axiosServices.get("/api/user/investment-summary");

                setProfile(res.data);
                setReferrals(res.data.referrals ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session]);

    if (status === "loading" || loading) return null;

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* HERO */}
            <div className="bg-white h-32 rounded-b-3xl shadow-md text-centerm p-3">
                <h2 className="text-2xl font-bold text-gray-800">🏦 Mon Investissement</h2>

                <p className="font-bold text-xl text-[#014d74]">
                    {profile.user.investment_amount.toLocaleString()} FCFA
                </p>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="w-full max-w-md space-y-6">

                    {/* 👤 PARRAIN */}
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="font-semibold text-gray-700 mb-2">👤 Mon parrain</h3>

                        {profile?.referrer ? (
                            <div className="text-sm text-gray-800">
                                <p className="font-medium">{profile.referrer.phone}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Aucun parrain
                            </p>
                        )}
                    </div>

                    {/* 👥 FILLEULS */}
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">
                            👥 Mes filleuls
                        </h3>

                        {referrals.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                Aucun filleul pour le moment
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {referrals.map((ref) => (
                                    <li
                                        key={ref.id}
                                        className="flex justify-between items-center border-b pb-2 last:border-b-0"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {ref.phone}
                                            </p>
                                        </div>

                                        <span className="text-sm font-semibold text-[#0F766E]">
                      {Number(ref.investment_amount).toLocaleString()} FCFA
                    </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>

            <BottomNav />
        </div>
    );
}



