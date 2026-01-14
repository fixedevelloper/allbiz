'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {Order} from "../../../types/types";
import axiosServices from "../../../lib/axios";
import BottomMaket from "../../../components/BottomMaket";
import Header from "../../../components/Header";


export default function OrderDetailPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams(); // pour récupérer l'id depuis l'URL
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const orderId = params?.id;

    useEffect(() => {
        if (status === 'unauthenticated') router.replace('/');
    }, [status, router]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (!orderId) return;
                const res = await axiosServices.get(`/api/orders/${orderId}`);
                setOrder(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
                setError('Impossible de charger la commande');
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') fetchOrder();
    }, [status, orderId]);

    if (status === 'loading' || loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!order) return <p className="text-center mt-10">Commande introuvable</p>;

    const statusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'waiting': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-700">📦 Détails de la commande #{order.id}</h2>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-6 px-4 space-y-4">
                {/* Infos de la commande */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-500">Commande #{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColor(order.status)}`}>
              {order.status}
            </span>
                    </div>

                    <div className="text-gray-600 text-sm">
                        Date: {new Date(order.created_at).toLocaleDateString()} <br />
                        Total: {order.amount.toLocaleString()} FCFA
                    </div>

                    <div className="border-t pt-2 space-y-1 max-h-60 overflow-y-auto">
                        {order.items.map(item => (
                            <div key={item.product_id} className="flex justify-between text-gray-700 text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{((item.promotion_price ?? item.price) * item.quantity).toLocaleString()} FCFA</span>
                            </div>
                        ))}
                    </div>

                    {order.amount_rest && order.amount_rest > 0 && (
                        <div className="text-right text-red-500 font-medium">
                            Montant restant: {order.amount_rest.toLocaleString()} FCFA
                        </div>
                    )}
                </div>

                {/* Suivi du statut */}
                <div className="bg-white rounded-2xl shadow p-4 text-gray-800 space-y-3">
                    <h3 className="font-semibold text-gray-700 mb-2">Suivi de la commande</h3>
                    <div className="flex justify-between items-center text-sm">
                        <span>Pending</span>
                        <span className={`px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>✓</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span>Waiting</span>
                        <span className={`px-2 py-1 rounded-full ${order.status === 'waiting' ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>✓</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span>Confirmed</span>
                        <span className={`px-2 py-1 rounded-full ${order.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-500'}`}>✓</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span>Failed</span>
                        <span className={`px-2 py-1 rounded-full ${order.status === 'failed' ? 'bg-red-200 text-red-800' : 'bg-gray-100 text-gray-500'}`}>✓</span>
                    </div>
                </div>
            </div>

            <BottomMaket />
        </div>
    );
}
