'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axiosServices from "../../lib/axios";
import {Order} from "../../types/types";
import Header from "../../components/Header";
import BottomMaket from "../../components/BottomMaket";


export default function MyOrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Redirection si non connecté
    useEffect(() => {
        if (status === 'unauthenticated') router.replace('/');
    }, [status, router]);

    // 🔹 Charger les commandes
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosServices.get('/api/orders');
                setOrders(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
                setError('Impossible de charger vos commandes');
            } finally {
                setLoading(false);
            }
        };
        if (status === 'authenticated') fetchOrders();
    }, [status]);

    if (status === 'loading' || loading) return <p className="text-center mt-10">Chargement...</p>;
    if (!orders.length) return <p className="text-center mt-10">Vous n’avez pas encore de commandes</p>;

    const statusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'waiting': return 'bg-blue-100 text-blue-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-32 flex flex-col">
            <Header />

            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-500">📦 Mes commandes</h2>
                </div>
            </div>

            <div className="max-w-xl mx-auto mt-6 space-y-4 px-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl shadow p-4 space-y-3">
                        <div className="flex justify-between items-center text-gray-500">
                            <span className="font-semibold">Commande #{order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${statusColor(order.status)}`}>
                {order.status}
              </span>
                        </div>
                        <div className="text-gray-600 text-sm">
                            {new Date(order.created_at).toLocaleDateString()} - Total: {order.amount.toLocaleString()} FCFA
                        </div>

                        <div className="border-t pt-2 space-y-1 max-h-40 overflow-y-auto">
                            {order.items.map(item => (
                                <div key={item.product_id} className="flex justify-between text-gray-700 text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>{((item.promotion_price ?? item.price) * item.quantity).toLocaleString()} FCFA</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="w-full mt-2 bg-[#014d74] hover:bg-[#0F766E] text-white py-2 rounded-2xl font-medium transition"
                            onClick={() => router.push(`/market/my_orders/${order.id}`)}
                        >
                            Voir les détails
                        </button>
                    </div>
                ))}
            </div>

            <BottomMaket />
        </div>
    );
}
