'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";

export default function Faq() {
    const { data: session } = useSession();
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!session) {
        router.push("/");
        return null;
    }

    const faqs = [
        {
            q: "Comment fonctionne la plateforme ?",
            a: "Vous investissez dans une formule. Des gains sont générés automatiquement et vous pouvez retirer vos bénéfices à tout moment."
        },
        {
            q: "Les retraits sont-ils instantanés ?",
            a: "Les retraits sont généralement traités en quelques minutes à quelques heures selon l’opérateur mobile."
        },
        {
            q: "Quel est le montant minimum de retrait ?",
            a: "Le montant minimum dépend de votre formule, mais commence généralement à partir de 1 000 FCFA."
        },
        {
            q: "Y a-t-il des frais de retrait ?",
            a: "Oui, des frais de 10% sont appliqués sur chaque retrait afin de couvrir les coûts opérationnels."
        },
        {
            q: "Puis-je inviter des amis ?",
            a: "Oui. Grâce au système de parrainage, vous gagnez des commissions sur les investissements de vos filleuls."
        },
        {
            q: "Mes données sont-elles sécurisées ?",
            a: "Absolument. Nous utilisons des technologies modernes pour protéger vos données et transactions."
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                <h2 className="text-2xl font-bold text-blue-700">❓ Foire Aux Questions</h2>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="w-full max-w-md space-y-4">

                    {faqs.map((item, index) => {
                        const open = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow transition"
                            >
                                <button
                                    onClick={() => setOpenIndex(open ? null : index)}
                                    className="w-full flex justify-between items-center p-4 text-left"
                                >
                  <span className="font-semibold text-gray-800">
                    {item.q}
                  </span>

                                    <span
                                        className={`text-[#0F766E] transform transition ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    >
                    ▼
                  </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        open ? "max-h-40 px-4 pb-4" : "max-h-0 px-4"
                                    }`}
                                >
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

