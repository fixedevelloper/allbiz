'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";

export default function HowWorks() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push("/");
        return null;
    }

    const steps = [
        {
            icon: "📝",
            title: "Créer un compte",
            desc: "Inscrivez-vous en quelques secondes avec votre numéro de téléphone."
        },
        {
            icon: "💳",
            title: "Choisir une formule",
            desc: "Sélectionnez une formule d’investissement adaptée à votre budget."
        },
        {
            icon: "🎰",
            title: "Générer des gains",
            desc: "Vos investissements génèrent automatiquement des gains et des récompenses."
        },
        {
            icon: "💸",
            title: "Retirer vos bénéfices",
            desc: "Retirez vos gains à tout moment via Mobile Money."
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                <h2 className="text-2xl font-bold text-blue-700">
                    🚀 Comment ça marche
                </h2>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="w-full max-w-md space-y-6">

                    {/* Steps */}
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-4 flex items-start gap-4 hover:shadow-xl transition"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F766E]/10 text-xl">
                                {step.icon}
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800">
                                    {index + 1}. {step.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Security block */}
                    <div className="bg-gradient-to-r from-[#0F766E]/10 to-[#014d74]/10 rounded-2xl p-4 text-center">
                        <p className="font-semibold text-gray-800 mb-1">
                            🔐 Sécurité & Transparence
                        </p>
                        <p className="text-sm text-gray-600">
                            Toutes les transactions sont sécurisées et traçables.
                            Vos données sont protégées et vos gains restent accessibles à tout moment.
                        </p>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full bg-[#0F766E] hover:bg-[#014d74] text-white py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-[1.02]"
                    >
                        Commencer maintenant
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

