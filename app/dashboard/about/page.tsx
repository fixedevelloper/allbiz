'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";


export default function About() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero */}
            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-700">🏦 À propos de nous</h2>
                </div>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="w-full max-w-md space-y-6">

                    {/* Intro */}
                    <div className="bg-white rounded-2xl shadow p-5 text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Une plateforme d’investissement moderne
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Notre plateforme permet aux utilisateurs d’investir facilement,
                            de générer des gains quotidiens et de retirer leurs fonds en toute
                            sécurité via les opérateurs mobiles locaux.
                        </p>
                    </div>

                    {/* Comment ça marche */}
                    <div className="bg-white rounded-2xl shadow p-5">
                        <h3 className="font-semibold text-gray-800 mb-4 text-center">
                            ⚙️ Comment ça fonctionne
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex gap-3">
                                <span className="font-bold text-[#0F766E]">1.</span>
                                Créez un compte et activez votre investissement
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-[#0F766E]">2.</span>
                                Générez des gains grâce à nos mécanismes intelligents
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-[#0F766E]">3.</span>
                                Retirez vos gains à tout moment via Mobile Money
                            </li>
                        </ul>
                    </div>

                    {/* Pourquoi nous */}
                    <div className="bg-white rounded-2xl shadow p-5">
                        <h3 className="font-semibold text-gray-800 mb-4 text-center">
                            🔒 Pourquoi nous faire confiance
                        </h3>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                🔐 <p className="font-bold mt-1 text-blue-700">Sécurité</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                ⚡ <p className="font-bold mt-1 text-blue-700">Rapidité</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                📊 <p className="font-bold mt-1 text-blue-700">Transparence</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 text-center">
                                🤝 <p className="font-bold mt-1 text-blue-700">Fiabilité</p>
                            </div>
                        </div>
                    </div>

                    {/* Mentions */}
                    <div className="bg-white rounded-2xl shadow p-5 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} – Tous droits réservés <br />
                        Contact : support@allbiz.com
                    </div>

                </div>
            </div>

            <BottomNav />
        </div>
    );
}

