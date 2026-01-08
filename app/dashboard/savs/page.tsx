'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function SAV() {
    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            {/* Hero */}
            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-700">🎧 Service Clientèle</h2>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-4 mt-6 w-full max-w-md mx-auto space-y-4">

                {/* WhatsApp */}
                <SupportCard
                    icon={<MessageCircle className="text-green-500 w-7 h-7" />}
                    title="Support WhatsApp"
                    description="Réponse rapide via WhatsApp"
                    actionLabel="Discuter"
                    href="https://wa.me/237690000000?text=Bonjour,%20j'ai%20besoin%20d'aide"
                    color="bg-green-500"
                />

                 Téléphone
                <SupportCard
                    icon={<Phone className="text-blue-500 w-7 h-7" />}
                    title="Appel téléphonique"
                    description="Parlez directement à un agent"
                    actionLabel="Appeler"
                    href="tel:+237690000000"
                    color="bg-blue-500"
                />

                 Telegram
                <SupportCard
                    icon={<Send className="text-sky-500 w-7 h-7" />}
                    title="Telegram"
                    description="Support via Telegram"
                    actionLabel="Ouvrir"
                    href="https://t.me/allbiz"
                    color="bg-sky-500"
                />

                 Email
                <SupportCard
                    icon={<Mail className="text-gray-600 w-7 h-7" />}
                    title="Email"
                    description="Contact par email"
                    actionLabel="Écrire"
                    href="mailto:support@allbiz.com"
                    color="bg-gray-700"
                />

            </div>

            <BottomNav />
        </div>
    );
}

/* ---------------------------------- */
/* Composant carte réutilisable       */
/* ---------------------------------- */

function SupportCard({
                         icon,
                         title,
                         description,
                         actionLabel,
                         href,
                         color,
                     }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel: string;
    href: string;
    color: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full flex items-center justify-between hover:shadow-xl transition">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>

            <a
                href={href}
                target="_blank"
                className={`${color} text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition`}
            >
                {actionLabel}
            </a>
        </div>
    );
}
