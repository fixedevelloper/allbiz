'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import axiosServices from "../../lib/axios";
import {useSnackbar} from "notistack";



export default function InviteFriends() {
    const { data: session } = useSession();
    const [refLink, setRefLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    useEffect(() => {
        const fetchReferral = async () => {
            try {
                const res = await axiosServices.get("/api/user/referral-link");
                setRefLink(res.data.referral_link ?? res.data);
            } catch {
                setError("Impossible de charger le lien de parrainage");
            } finally {
                setLoading(false);
            }
        };
        fetchReferral();
    }, []);

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-32 rounded-b-3xl shadow-md" />

            <div className="relative -mt-20 px-4 flex justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

                    {/* Title */}
                    <h2 className="text-center text-xl font-bold text-gray-800">
                        🎁 Invite tes amis
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Gagne des commissions sur chaque investissement
                    </p>

                    {/* Referral link */}
                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-700">
                            Ton lien de parrainage
                        </label>

                        <div className="mt-2 flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#014d74]">
                            <input
                                type="text"
                                value={refLink}
                                readOnly
                                className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(refLink);
                                    enqueueSnackbar("Lien copié avec succès", { variant: "success" });
                                }}
                                className="px-4 bg-[#014d74] text-white text-sm font-semibold hover:bg-[#01385a] transition"
                            >
                                Copier
                            </button>
                        </div>
                    </div>

                    {/* Share buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                "💰 Rejoins cette plateforme d’investissement et gagne de l’argent : " +
                                refLink
                            )}`}
                            target="_blank"
                            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white py-2 font-semibold hover:bg-green-600 transition"
                        >
                            WhatsApp
                        </a>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                refLink
                            )}`}
                            target="_blank"
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition"
                        >
                            Facebook
                        </a>
                    </div>

                    {/* Info box */}
                    <div className="mt-6 bg-[#014d74]/10 border border-[#014d74]/20 rounded-xl p-4 text-sm text-gray-700">
                        💡 <strong>Astuce :</strong> Plus tes amis investissent, plus tes
                        commissions augmentent automatiquement.
                    </div>

                    {error && (
                        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

