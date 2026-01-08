'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import Image from "next/image";
import Link from "next/link";

const formules = [
    { id: 1000, title: "Formule 1000 FCFA", description: "Gain fixe : 500 FCFA.", price: 1000, color: "bg-cyan-50" },
    { id: 2000, title: "Formule 2000 FCFA", description: "Gain fixe : 500–1000 FCFA.", price: 2000, color: "bg-orange-50" },
    { id: 5000, title: "Formule 5000 FCFA", description: "Gain : 500–2500 FCFA + 1 roulette.", price: 5000, color: "bg-purple-50" },
    { id: 10000, title: "Formule 10000 FCFA", description: "Gain : 500–5000 FCFA + 2 roulettes.", price: 10000, color: "bg-green-50" },
];



export default function Recharge() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push("/");
        return null;
    }

    const currentFormule = session.user.formule_id;

    const handleSelectFormule = (formuleId: number) => {
        // Récupérer la formule correspondant à l'ID
        const selectedFormule = formules.find(f => f.id === formuleId);

        if (!selectedFormule) return;

        // Stocker dans sessionStorage
        sessionStorage.setItem('formule_data', JSON.stringify(selectedFormule));

        // Rediriger vers checkout
        router.push(`/checkout`);
    };


    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            <Header />

            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                <h2 className="text-2xl font-bold text-blue-700">
                    Choisir une formule
                </h2>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                    {formules.map((item) => {
                        const isSelected = item.id === currentFormule;

                        return (
                            <div
                                key={item.id}
                                className={`
                  rounded-2xl p-4 shadow-md flex flex-col justify-between
                  transition-all duration-200
                  ${item.color}
                  ${isSelected ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:-translate-y-1"}
                `}
                            >
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 text-center">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-2 text-center">
                                        {item.description}
                                    </p>
                                </div>

                                <button
                                    disabled={isSelected}
                                    onClick={() => handleSelectFormule(item.id)}
                                    className={`
                    mt-4 py-2 rounded-xl text-sm font-semibold
                    ${
                                        isSelected
                                            ? "bg-gray-300 text-gray-600"
                                            : "bg-[#0F766E] text-white hover:bg-[#115e59]"
                                    }
                  `}
                                >
                                    {isSelected ? "Formule active" : "Choisir"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

